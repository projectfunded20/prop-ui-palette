-- Run against the application database using a privileged test connection.
-- All test order changes are rolled back.
BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '7e6b8822-5c1c-4acb-8c2a-ddea00d9c049', true);
DO $$
DECLARE target uuid; changed integer;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Assigned account must have admin access';
  END IF;
  SELECT id INTO target FROM public.orders WHERE user_id <> auth.uid() LIMIT 1;
  IF target IS NULL THEN RAISE EXCEPTION 'Admin must see customer orders'; END IF;
  UPDATE public.orders SET status = 'completed' WHERE id = target;
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN RAISE EXCEPTION 'Admin must accept customer orders'; END IF;
  UPDATE public.orders SET status = 'rejected' WHERE id = target;
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN RAISE EXCEPTION 'Admin must reject customer orders'; END IF;
END $$;
SELECT set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-000000000000', true);
DO $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Unassigned account must not be admin'; END IF;
  IF EXISTS (SELECT 1 FROM public.orders) OR EXISTS (SELECT 1 FROM public.profiles) THEN
    RAISE EXCEPTION 'Unassigned account must not read other users data';
  END IF;
END $$;
ROLLBACK;