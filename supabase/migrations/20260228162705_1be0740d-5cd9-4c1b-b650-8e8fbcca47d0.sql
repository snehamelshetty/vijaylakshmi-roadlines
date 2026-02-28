
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trucks table
CREATE TABLE public.trucks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  truck_type TEXT NOT NULL, -- Mini, 14ft, 20ft, Trailer
  capacity TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available', -- available, booked, maintenance
  image_url TEXT,
  price_per_km NUMERIC(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view trucks" ON public.trucks
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage trucks" ON public.trucks
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT NOT NULL UNIQUE DEFAULT 'VRL-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8)),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  pickup_location TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  truck_type TEXT NOT NULL,
  goods_type TEXT,
  weight TEXT,
  pickup_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'booked', -- booked, picked_up, in_transit, delivered, cancelled
  truck_id UUID REFERENCES public.trucks(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public can view own booking by tracking_id" ON public.bookings
  FOR SELECT USING (true);

-- Tracking events table
CREATE TABLE public.tracking_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL,
  location TEXT,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tracking events" ON public.tracking_events
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage tracking events" ON public.tracking_events
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trucks_updated_at BEFORE UPDATE ON public.trucks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed some truck data
INSERT INTO public.trucks (name, truck_type, capacity, location, status, price_per_km) VALUES
  ('Tata Ace', 'Mini', '1 Ton', 'Bangalore', 'available', 12.00),
  ('Eicher 14ft', '14ft', '4 Ton', 'Bangalore', 'available', 18.00),
  ('Tata 20ft', '20ft', '8 Ton', 'Mumbai', 'available', 22.00),
  ('Ashok Leyland Trailer', 'Trailer', '20 Ton', 'Hyderabad', 'available', 28.00),
  ('Mahindra Bolero Pickup', 'Mini', '1.5 Ton', 'Chennai', 'available', 14.00),
  ('Eicher 20ft Container', '20ft', '7 Ton', 'Pune', 'booked', 24.00),
  ('Tata LPT Trailer', 'Trailer', '25 Ton', 'Delhi', 'available', 30.00),
  ('Tata Ace Gold', 'Mini', '1.2 Ton', 'Kolkata', 'maintenance', 13.00);
