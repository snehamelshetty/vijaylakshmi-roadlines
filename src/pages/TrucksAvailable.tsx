import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Truck, MapPin, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const trucksData = [
  { id: 1, type: "Mini Truck", capacity: "1-2 Tons", location: "Hyderabad", available: true, image: "🚛" },
  { id: 2, type: "14ft Closed", capacity: "3-5 Tons", location: "Mumbai", available: true, image: "🚚" },
  { id: 3, type: "20ft Container", capacity: "7-10 Tons", location: "Hyderabad", available: false, image: "🚛" },
  { id: 4, type: "Trailer", capacity: "15-25 Tons", location: "Chennai", available: true, image: "🚛" },
  { id: 5, type: "Mini Truck", capacity: "1-2 Tons", location: "Bangalore", available: true, image: "🚚" },
  { id: 6, type: "20ft Container", capacity: "7-10 Tons", location: "Delhi", available: true, image: "🚛" },
  { id: 7, type: "14ft Closed", capacity: "3-5 Tons", location: "Pune", available: true, image: "🚚" },
  { id: 8, type: "Trailer", capacity: "15-25 Tons", location: "Hyderabad", available: false, image: "🚛" },
];

const TrucksAvailable = () => {
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { t } = useLanguage();

  const locations = [...new Set(trucksData.map((tr) => tr.location))];
  const types = [...new Set(trucksData.map((tr) => tr.type))];

  const filtered = trucksData.filter((tr) => {
    if (locationFilter !== "all" && tr.location !== locationFilter) return false;
    if (typeFilter !== "all" && tr.type !== typeFilter) return false;
    return true;
  });

  return (
    <Layout>
      <section className="gradient-primary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            {t("trucks_title")}
          </motion.h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            {t("trucks_subtitle")}
          </p>
        </div>
      </section>

      <section className="section-padding container mx-auto">
        <div className="flex flex-wrap gap-4 mb-8 items-center">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((truck, i) => (
            <motion.div
              key={truck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-6 card-shadow border border-border"
            >
              <div className="text-5xl text-center mb-4">{truck.image}</div>
              <h3 className="font-semibold text-foreground text-center mb-1">{truck.type}</h3>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="w-3.5 h-3.5" /> {truck.location}
              </div>
              <div className="text-center text-sm text-muted-foreground mb-3">
                {t("capacity")}: {truck.capacity}
              </div>
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  truck.available
                    ? "bg-[hsl(142,70%,90%)] text-[hsl(142,70%,30%)]"
                    : "bg-destructive/10 text-destructive"
                }`}>
                  {truck.available ? t("available") : t("booked")}
                </span>
              </div>
              {truck.available && (
                <Button variant="blue" size="sm" className="w-full" asChild>
                  <Link to="/book">{t("nav_book_now")}</Link>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TrucksAvailable;
