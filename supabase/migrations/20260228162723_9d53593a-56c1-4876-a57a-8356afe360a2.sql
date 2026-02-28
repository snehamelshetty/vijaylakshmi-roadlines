
-- Drop the overly permissive insert policy and replace with a more specific one
DROP POLICY "Anyone can create bookings" ON public.bookings;

-- Allow anyone to insert but only specific columns
CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (
    customer_name IS NOT NULL AND 
    customer_phone IS NOT NULL AND 
    pickup_location IS NOT NULL AND 
    delivery_location IS NOT NULL AND 
    truck_type IS NOT NULL AND 
    pickup_date IS NOT NULL AND
    status = 'booked'
  );
