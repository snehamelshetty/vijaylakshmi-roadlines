
-- Add user_id column to bookings for logged-in customer bookings
ALTER TABLE public.bookings ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Policy: logged-in users can view their own bookings (by user_id)
CREATE POLICY "Users can view own bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
