ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by uuid;
UPDATE public.profiles SET referral_code = upper(substr(md5(id::text || random()::text),1,8)) WHERE referral_code IS NULL;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_referral_code_key ON public.profiles(referral_code);
CREATE INDEX IF NOT EXISTS profiles_referred_by_idx ON public.profiles(referred_by);

CREATE OR REPLACE FUNCTION public.vexo_profile_referral_insert()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _code text; _ref uuid;
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := upper(substr(md5(NEW.id::text || random()::text),1,8));
  END IF;
  SELECT upper(trim(raw_user_meta_data->>'ref')) INTO _code FROM auth.users WHERE id = NEW.id;
  NEW.referred_by := NULL;
  IF _code IS NOT NULL AND _code <> '' THEN
    SELECT id INTO _ref FROM public.profiles WHERE referral_code = _code;
    IF _ref IS NOT NULL AND _ref <> NEW.id THEN NEW.referred_by := _ref; END IF;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS profiles_referral_insert ON public.profiles;
CREATE TRIGGER profiles_referral_insert BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.vexo_profile_referral_insert();

CREATE OR REPLACE FUNCTION public.vexo_profile_referral_lock()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.referral_code := OLD.referral_code;
  NEW.referred_by := OLD.referred_by;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS profiles_referral_lock ON public.profiles;
CREATE TRIGGER profiles_referral_lock BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.vexo_profile_referral_lock();

CREATE OR REPLACE FUNCTION public.my_affiliate_referrals()
RETURNS TABLE(referral_name text, joined_at timestamptz, purchases integer, successful_purchases integer)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT
    CASE WHEN coalesce(p.full_name,'') = '' THEN 'Trader' ELSE split_part(p.full_name,' ',1) || ' ' || left(coalesce(nullif(split_part(p.full_name,' ',2),''),''),1) END,
    p.created_at,
    (SELECT count(*)::int FROM public.orders o WHERE o.user_id = p.id),
    (SELECT count(*)::int FROM public.orders o WHERE o.user_id = p.id AND o.status = 'completed')
  FROM public.profiles p
  WHERE p.referred_by = auth.uid() AND auth.uid() IS NOT NULL
  ORDER BY p.created_at DESC
$$;
REVOKE ALL ON FUNCTION public.my_affiliate_referrals() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_affiliate_referrals() TO authenticated;