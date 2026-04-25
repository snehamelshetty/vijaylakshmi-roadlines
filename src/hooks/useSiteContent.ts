import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type BrandSettings = { name: string; subtitle: string; logo_url: string };
export type HomeHeroSettings = {
  heading: string;
  subheading: string;
  cta_primary: string;
  cta_secondary: string;
};
export type AboutSettings = {
  mission: string;
  vision: string;
  values: { title: string; desc: string }[];
};
export type ContactSettings = {
  address: string;
  phone: string;
  email: string;
  hours: string;
};
export type TestimonialItem = { name: string; company: string; text: string; rating: number };
export type TestimonialsSettings = { items: TestimonialItem[] };

export const DEFAULTS = {
  brand: { name: "Vijayalakshmi", subtitle: "Roadlines", logo_url: "" } as BrandSettings,
  home_hero: {
    heading: "Reliable Logistics, Delivered",
    subheading: "Trusted partner for road transportation across India",
    cta_primary: "Book a Truck",
    cta_secondary: "Track Shipment",
  } as HomeHeroSettings,
  about: {
    mission: "To deliver reliable, safe, and timely logistics solutions across India.",
    vision: "To become the most trusted logistics brand in the country.",
    values: [
      { title: "Reliability", desc: "On-time, every time." },
      { title: "Speed", desc: "Express delivery options." },
      { title: "Safety", desc: "Cargo handled with care." },
    ],
  } as AboutSettings,
  contact: {
    address: "Hyderabad, Telangana, India",
    phone: "+91 98765 43210",
    email: "info@vijayalakshmiroadlines.com",
    hours: "Mon-Sat 9am-7pm",
  } as ContactSettings,
  testimonials: { items: [] } as TestimonialsSettings,
};

export function useSiteSetting<K extends keyof typeof DEFAULTS>(
  key: K
): { value: (typeof DEFAULTS)[K]; loading: boolean; refresh: () => void } {
  const [value, setValue] = useState<(typeof DEFAULTS)[K]>(DEFAULTS[key]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", key)
      .maybeSingle();
    if (data?.value) setValue({ ...DEFAULTS[key], ...(data.value as object) } as any);
    setLoading(false);
  }, [key]);

  useEffect(() => {
    load();
  }, [load]);

  return { value, loading, refresh: load };
}

export async function saveSiteSetting(key: string, value: object) {
  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .eq("key", key)
    .maybeSingle();
  if (existing) {
    return supabase.from("site_settings").update({ value }).eq("id", existing.id);
  }
  return supabase.from("site_settings").insert({ key, value });
}

export async function uploadSiteAsset(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-assets").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) return null;
  const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
  return data.publicUrl;
}
