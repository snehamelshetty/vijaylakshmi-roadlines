
-- 1. Bookings: remove permissive public SELECT
DROP POLICY IF EXISTS "Public can view own booking by tracking_id" ON public.bookings;

-- 2. Safe RPC to look up a booking by tracking ID (no PII)
CREATE OR REPLACE FUNCTION public.get_booking_by_tracking_id(p_tracking_id text)
RETURNS TABLE (
  id uuid,
  tracking_id text,
  status text,
  pickup_location text,
  delivery_location text,
  truck_type text,
  pickup_date date,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, tracking_id, status, pickup_location, delivery_location,
         truck_type, pickup_date, created_at
  FROM public.bookings
  WHERE tracking_id = upper(trim(p_tracking_id))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_booking_by_tracking_id(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_booking_by_tracking_id(text) TO anon, authenticated;

-- 3. Safe RPC to look up tracking events for a tracking ID
CREATE OR REPLACE FUNCTION public.get_tracking_events_by_tracking_id(p_tracking_id text)
RETURNS TABLE (
  id uuid,
  status text,
  location text,
  latitude numeric,
  longitude numeric,
  description text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT te.id, te.status, te.location, te.latitude, te.longitude, te.description, te.created_at
  FROM public.tracking_events te
  JOIN public.bookings b ON b.id = te.booking_id
  WHERE b.tracking_id = upper(trim(p_tracking_id))
  ORDER BY te.created_at ASC;
$$;

REVOKE ALL ON FUNCTION public.get_tracking_events_by_tracking_id(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_tracking_events_by_tracking_id(text) TO anon, authenticated;

-- 4. Tighten tracking_events: drop public SELECT, allow admins + booking owners only
DROP POLICY IF EXISTS "Anyone can view tracking events" ON public.tracking_events;

CREATE POLICY "Owners can view tracking events for own bookings"
ON public.tracking_events
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.id = tracking_events.booking_id
      AND b.user_id = auth.uid()
  )
);

-- 5. user_roles: add explicit restrictive policy preventing non-admins from inserting/updating roles
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated, anon
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
AS RESTRICTIVE
FOR UPDATE
TO authenticated, anon
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
AS RESTRICTIVE
FOR DELETE
TO authenticated, anon
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 6. Storage: prevent listing of site-assets bucket while keeping individual file URLs publicly readable.
-- (Public read by URL still works because Storage public buckets allow object GET via signed-less URL.)
DROP POLICY IF EXISTS "Public can list site-assets" ON storage.objects;
