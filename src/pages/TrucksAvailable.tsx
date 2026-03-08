import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Truck, MapPin, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const TrucksAvailable = () => {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { t } = useLanguage();

  useEffect(() => {
    const fetchTrucks = async () => {
      const { data } = await supabase.from("trucks").select("*").order("created_at", { ascending: false });
      setTrucks(data || []);
    };
    fetchTrucks();
  }, []);

  const locations = [...new Set(trucks.map((tr) => tr.location))];
  const types = [...new Set(trucks.map((tr) => tr.truck_type))];

  const filtered = trucks.filter((tr) => {
    if (locationFilter !== "all" && tr.location !== locationFilter) return false;
    if (typeFilter !== "all" && tr.truck_type !== typeFilter) return false;
    return true;
  });

  return (
    <Layout>
      <section className="gradient-primary section-padding overflow-hidden">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            {t("trucks_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/80 max-w-2xl mx-auto text-lg"
          >
            {t("trucks_subtitle")}
          </motion.p>
        </div>
      </section>

      <ParallaxSection speed={0.08}>
        <section className="section-padding container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-4 mb-8 items-center"
          >
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Location" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all_locations")}</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder={t("truck_type")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all_types")}</SelectItem>
                {types.map((tp) => (
                  <SelectItem key={tp} value={tp}>{tp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground ml-auto">{filtered.length} {t("trucks_found")}</span>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filtered.map((truck) => (
              <motion.div
                key={truck.id}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-card rounded-xl p-6 card-shadow border border-border transition-all duration-300"
              >
                <div className="text-5xl text-center mb-4">🚛</div>
                <h3 className="font-semibold text-foreground text-center mb-1">{truck.name}</h3>
                <div className="text-xs text-center text-muted-foreground mb-1">{truck.truck_type}</div>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-3.5 h-3.5" /> {truck.location}
                </div>
                <div className="text-center text-sm text-muted-foreground mb-3">
                  {t("capacity")}: {truck.capacity}
                </div>
                <div className="text-center mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    truck.status === "available"
                      ? "bg-[hsl(142,70%,90%)] text-[hsl(142,70%,30%)]"
                      : truck.status === "booked"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {truck.status === "available" ? t("available") : truck.status === "booked" ? t("booked") : truck.status}
                  </span>
                </div>
                {truck.status === "available" && (
                  <Button variant="blue" size="sm" className="w-full" asChild>
                    <Link to="/book">{t("nav_book_now")}</Link>
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>
      </ParallaxSection>
    </Layout>
  );
};

export default TrucksAvailable;
