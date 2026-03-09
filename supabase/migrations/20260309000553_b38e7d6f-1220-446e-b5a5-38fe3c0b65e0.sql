-- Create function to auto-create initial tracking event when booking is created
CREATE OR REPLACE FUNCTION public.handle_new_booking()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.tracking_events (booking_id, status, description, location)
  VALUES (NEW.id, 'booked', 'Booking confirmed and awaiting pickup', NEW.pickup_location);
  RETURN NEW;
END;
$$;

-- Create trigger for new bookings
CREATE TRIGGER on_booking_created
  AFTER INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_booking();