CREATE OR REPLACE FUNCTION public.vexo_completed_broker_xprime()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    NEW.broker := 'XPrime';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS vexo_completed_broker_xprime ON public.orders;
CREATE TRIGGER vexo_completed_broker_xprime BEFORE INSERT OR UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.vexo_completed_broker_xprime();
UPDATE public.orders SET broker = 'XPrime' WHERE status = 'completed' AND broker <> 'XPrime';