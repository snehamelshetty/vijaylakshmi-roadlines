import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2, Star } from "lucide-react";
import {
  DEFAULTS,
  saveSiteSetting,
  type BrandSettings,
  type HomeHeroSettings,
  type AboutSettings,
  type ContactSettings,
  type TestimonialsSettings,
} from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";

const AdminContent = () => {
  const [brand, setBrand] = useState<BrandSettings>(DEFAULTS.brand);
  const [hero, setHero] = useState<HomeHeroSettings>(DEFAULTS.home_hero);
  const [about, setAbout] = useState<AboutSettings>(DEFAULTS.about);
  const [contact, setContact] = useState<ContactSettings>(DEFAULTS.contact);
  const [testimonials, setTestimonials] = useState<TestimonialsSettings>(DEFAULTS.testimonials);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      data?.forEach((row: any) => {
        if (row.key === "brand") setBrand({ ...DEFAULTS.brand, ...row.value });
        if (row.key === "home_hero") setHero({ ...DEFAULTS.home_hero, ...row.value });
        if (row.key === "about") setAbout({ ...DEFAULTS.about, ...row.value });
        if (row.key === "contact") setContact({ ...DEFAULTS.contact, ...row.value });
        if (row.key === "testimonials") setTestimonials({ ...DEFAULTS.testimonials, ...row.value });
      });
    })();
  }, []);

  const save = async (key: string, value: object) => {
    const { error } = await saveSiteSetting(key, value);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Site Content</h2>
      <Tabs defaultValue="brand">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="hero">Home Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-4 bg-card p-6 rounded-xl border border-border mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={brand.name} onChange={(e) => setBrand({ ...brand, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input value={brand.subtitle} onChange={(e) => setBrand({ ...brand, subtitle: e.target.value })} />
            </div>
          </div>
          <ImageUpload
            label="Logo"
            value={brand.logo_url}
            onChange={(url) => setBrand({ ...brand, logo_url: url })}
            folder="brand"
          />
          <Button variant="blue" onClick={() => save("brand", brand)}>Save Brand</Button>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4 bg-card p-6 rounded-xl border border-border mt-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input value={hero.heading} onChange={(e) => setHero({ ...hero, heading: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Subheading</Label>
            <Textarea value={hero.subheading} onChange={(e) => setHero({ ...hero, subheading: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary CTA</Label>
              <Input value={hero.cta_primary} onChange={(e) => setHero({ ...hero, cta_primary: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Secondary CTA</Label>
              <Input value={hero.cta_secondary} onChange={(e) => setHero({ ...hero, cta_secondary: e.target.value })} />
            </div>
          </div>
          <Button variant="blue" onClick={() => save("home_hero", hero)}>Save Hero</Button>
        </TabsContent>

        <TabsContent value="about" className="space-y-4 bg-card p-6 rounded-xl border border-border mt-4">
          <div className="space-y-2">
            <Label>Mission</Label>
            <Textarea value={about.mission} onChange={(e) => setAbout({ ...about, mission: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Vision</Label>
            <Textarea value={about.vision} onChange={(e) => setAbout({ ...about, vision: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Core Values</Label>
            {about.values.map((v, i) => (
              <div key={i} className="flex gap-2 items-start">
                <Input
                  placeholder="Title"
                  value={v.title}
                  onChange={(e) => {
                    const next = [...about.values];
                    next[i] = { ...next[i], title: e.target.value };
                    setAbout({ ...about, values: next });
                  }}
                />
                <Input
                  placeholder="Description"
                  value={v.desc}
                  onChange={(e) => {
                    const next = [...about.values];
                    next[i] = { ...next[i], desc: e.target.value };
                    setAbout({ ...about, values: next });
                  }}
                />
                <Button variant="ghost" size="sm" onClick={() => setAbout({ ...about, values: about.values.filter((_, j) => j !== i) })}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setAbout({ ...about, values: [...about.values, { title: "", desc: "" }] })}>
              <Plus className="w-4 h-4" /> Add Value
            </Button>
          </div>
          <Button variant="blue" onClick={() => save("about", about)}>Save About</Button>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 bg-card p-6 rounded-xl border border-border mt-4">
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Business Hours</Label>
            <Input value={contact.hours} onChange={(e) => setContact({ ...contact, hours: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Textarea
              rows={3}
              placeholder="Paste the src URL from Google Maps → Share → Embed a map"
              value={contact.map_embed}
              onChange={(e) => setContact({ ...contact, map_embed: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Open Google Maps, find your location, click Share → Embed a map → copy only the URL inside src="...".
            </p>
          </div>
          <Button variant="blue" onClick={() => save("contact", contact)}>Save Contact</Button>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4 bg-card p-6 rounded-xl border border-border mt-4">
          {testimonials.items.map((t, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-2">
              <div className="grid md:grid-cols-2 gap-2">
                <Input
                  placeholder="Name"
                  value={t.name}
                  onChange={(e) => {
                    const next = [...testimonials.items];
                    next[i] = { ...next[i], name: e.target.value };
                    setTestimonials({ items: next });
                  }}
                />
                <Input
                  placeholder="Company"
                  value={t.company}
                  onChange={(e) => {
                    const next = [...testimonials.items];
                    next[i] = { ...next[i], company: e.target.value };
                    setTestimonials({ items: next });
                  }}
                />
              </div>
              <Textarea
                placeholder="Testimonial text"
                value={t.text}
                onChange={(e) => {
                  const next = [...testimonials.items];
                  next[i] = { ...next[i], text: e.target.value };
                  setTestimonials({ items: next });
                }}
              />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                <Input
                  type="number"
                  min={1}
                  max={5}
                  className="w-20"
                  value={t.rating}
                  onChange={(e) => {
                    const next = [...testimonials.items];
                    next[i] = { ...next[i], rating: parseInt(e.target.value) || 5 };
                    setTestimonials({ items: next });
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-destructive"
                  onClick={() => setTestimonials({ items: testimonials.items.filter((_, j) => j !== i) })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setTestimonials({
                items: [...testimonials.items, { name: "", company: "", text: "", rating: 5 }],
              })
            }
          >
            <Plus className="w-4 h-4" /> Add Testimonial
          </Button>
          <div>
            <Button variant="blue" onClick={() => save("testimonials", testimonials)}>Save Testimonials</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
