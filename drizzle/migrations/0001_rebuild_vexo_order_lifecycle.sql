CREATE OR REPLACE FUNCTION public.reject_expired_orders()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  changed integer;
BEGIN
  UPDATE public.orders
  SET status = 'rejected'
  WHERE user_id = auth.uid()
    AND status = 'pending'
    AND decision_at <= now();
  GET DIAGNOSTICS changed = ROW_COUNT;
  RETURN changed;
END;
$$;
REVOKE ALL ON FUNCTION public.reject_expired_orders() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reject_expired_orders() TO authenticated;
GRANT EXECUTE ON FUNCTION public.reject_expired_orders() TO service_role;

CREATE OR REPLACE FUNCTION public.validate_vexo_order()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.account_type NOT IN ('instant', 'challenge') THEN
    RAISE EXCEPTION 'Invalid account type';
  END IF;
  IF NEW.account_size NOT IN (3000, 5000, 8000, 11000, 15000, 20000, 25000, 35000, 50000) THEN
    RAISE EXCEPTION 'Invalid account size';
  END IF;
  IF NEW.price < 0 THEN
    RAISE EXCEPTION 'Invalid order price';
  END IF;
  NEW.decision_at := NEW.created_at + interval '1 hour';
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS validate_vexo_order_before_write ON public.orders;
CREATE TRIGGER validate_vexo_order_before_write
BEFORE INSERT OR UPDATE OF account_type, account_size, price, decision_at ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.validate_vexo_order();