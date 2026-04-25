
-- Site settings (key/value JSON store for flexible content)
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site settings"
  ON public.site_settings FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed defaults
INSERT INTO public.site_settings (key, value) VALUES
  ('brand', '{"name":"Vijayalakshmi","subtitle":"Roadlines","logo_url":""}'::jsonb),
  ('home_hero', '{"heading":"Reliable Logistics, Delivered","subheading":"Trusted partner for road transportation across India","cta_primary":"Book a Truck","cta_secondary":"Track Shipment"}'::jsonb),
  ('about', '{"mission":"To deliver reliable, safe, and timely logistics solutions across India.","vision":"To become the most trusted logistics brand in the country.","values":[{"title":"Reliability","desc":"On-time, every time."},{"title":"Speed","desc":"Express delivery options."},{"title":"Safety","desc":"Cargo handled with care."}]}'::jsonb),
  ('contact', '{"address":"Hyderabad, Telangana, India","phone":"+91 98765 43210","email":"info@vijayalakshmiroadlines.com","hours":"Mon-Sat 9am-7pm"}'::jsonb),
  ('testimonials', '{"items":[]}'::jsonb);

-- Team members
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON public.team_members FOR SELECT USING (true);

CREATE POLICY "Admins can manage team members"
  ON public.team_members FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Extend trucks
ALTER TABLE public.trucks
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS features jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS gallery jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets','site-assets',true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view site assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admins can upload site assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site assets"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site assets"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));
