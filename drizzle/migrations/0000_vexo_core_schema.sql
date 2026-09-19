-- profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  country text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, country)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.email,
    NEW.raw_user_meta_data->>'country'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- orders
CREATE SEQUENCE public.order_ref_seq START 10483;
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('VEXO-' || nextval('public.order_ref_seq')::text),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type text NOT NULL CHECK (account_type IN ('instant','challenge')),
  account_size integer NOT NULL CHECK (account_size > 0),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  broker text NOT NULL,
  payment_method text NOT NULL,
  coupon text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','waiting_callback','completed','rejected')),
  decision_at timestamptz NOT NULL DEFAULT (now() + interval '1 hour'),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX orders_user_idx ON public.orders (user_id, created_at DESC);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
GRANT USAGE ON SEQUENCE public.order_ref_seq TO authenticated, service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own orders select" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own orders insert" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- support tickets
CREATE SEQUENCE public.ticket_ref_seq START 2292;
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('TCK-' || nextval('public.ticket_ref_seq')::text),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  priority text NOT NULL DEFAULT 'Medium',
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','pending','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
GRANT USAGE ON SEQUENCE public.ticket_ref_seq TO authenticated, service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tickets select" ON public.support_tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own tickets insert" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own tickets update" ON public.support_tickets FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author text NOT NULL DEFAULT 'user' CHECK (author IN ('user','support')),
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ticket_messages_ticket_idx ON public.ticket_messages (ticket_id, created_at);
GRANT SELECT, INSERT ON public.ticket_messages TO authenticated;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own ticket messages select" ON public.ticket_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own ticket messages insert" ON public.ticket_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);