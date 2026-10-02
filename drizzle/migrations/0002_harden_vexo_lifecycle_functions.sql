REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

ALTER FUNCTION public.reject_expired_orders() SECURITY INVOKER;
REVOKE ALL ON FUNCTION public.reject_expired_orders() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.reject_expired_orders() FROM anon;
GRANT EXECUTE ON FUNCTION public.reject_expired_orders() TO authenticated;
GRANT EXECUTE ON FUNCTION public.reject_expired_orders() TO service_role;

GRANT UPDATE (status) ON public.orders TO authenticated;
CREATE POLICY "own expired order status update"
ON public.orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending' AND decision_at <= now())
WITH CHECK (auth.uid() = user_id AND status = 'rejected');