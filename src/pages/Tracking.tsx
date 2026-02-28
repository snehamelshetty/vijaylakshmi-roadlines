import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Search, Package, MapPin, CheckCircle2, Truck, Clock } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const statusSteps = [
  { key: "booked", icon: Package, label: "Booked" },
  { key: "picked_up", icon: Truck, label: "Picked Up" },
  { key: "in_transit", icon: MapPin, label: "In Transit" },
  { key: "delivered", icon: CheckCircle2, label: "Delivered" },
];

const Tracking = () => {
  const [trackingId, setTrackingId] = useState("");
  const [booking, setBooking] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.error(t("tracking_enter_id"));
      return;
    }
    setLoading(true);
    setBooking(null);
    setEvents([]);

    try {
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("*")
        .eq("tracking_id", trackingId.trim().toUpperCase())
        .maybeSingle();

      if (bookingError) throw bookingError;
      if (!bookingData) {
        toast.error(t("tracking_not_found"));
        setLoading(false);
        return;
      }

      setBooking(bookingData);

      const { data: eventsData } = await supabase
        .from("tracking_events")
        .select("*")
        .eq("booking_id", bookingData.id)
        .order("created_at", { ascending: true });

      setEvents(eventsData || []);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = booking
    ? statusSteps.findIndex((s) => s.key === booking.status)
    : -1;

  return (
    <Layout>
      <section className="gradient-primary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            {t("tracking_title")}
          </motion.h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            {t("tracking_subtitle")}
          </p>
        </div>
      </section>

      <section className="section-padding container mx-auto max-w-3xl">
        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleTrack}
          className="bg-card rounded-xl p-6 card-shadow border border-border mb-8"
        >
          <Label htmlFor="trackingId" className="text-lg font-semibold mb-3 block">
            {t("tracking_enter_id")}
          </Label>
          <div className="flex gap-3">
            <Input
              id="trackingId"
              placeholder="VRL-XXXXXXXX"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="text-lg"
            />
            <Button type="submit" variant="blue" disabled={loading}>
              <Search className="w-4 h-4" />
              {t("tracking_track")}
            </Button>
          </div>
        </motion.form>

        {/* Results */}
        {booking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Booking Info */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {t("tracking_shipment_details")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{t("tracking_id_label")}:</span>
                  <span className="ml-2 font-semibold text-foreground">{booking.tracking_id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("tracking_status")}:</span>
                  <span className={`ml-2 font-semibold capitalize ${
                    booking.status === "delivered" ? "text-[hsl(142,70%,40%)]" : "text-secondary"
                  }`}>
                    {booking.status.replace("_", " ")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("pickup_location")}:</span>
                  <span className="ml-2 text-foreground">{booking.pickup_location}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("drop_location")}:</span>
                  <span className="ml-2 text-foreground">{booking.delivery_location}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("truck_type")}:</span>
                  <span className="ml-2 text-foreground">{booking.truck_type}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t("pickup_date")}:</span>
                  <span className="ml-2 text-foreground">{new Date(booking.pickup_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {t("tracking_timeline")}
              </h2>
              <div className="flex items-center justify-between mb-8">
                {statusSteps.map((step, i) => (
                  <div key={step.key} className="flex flex-col items-center relative flex-1">
                    {i < statusSteps.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-1 ${
                        i < currentStatusIndex ? "bg-secondary" : "bg-border"
                      }`} />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      i <= currentStatusIndex
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      i <= currentStatusIndex ? "text-secondary" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Events List */}
              {events.length > 0 && (
                <div className="space-y-3 border-t border-border pt-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-foreground capitalize">
                          {event.status.replace("_", " ")}
                          {event.location && ` — ${event.location}`}
                        </div>
                        {event.description && (
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Map placeholder */}
            <div className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {t("tracking_live_location")}
              </h2>
              <div className="rounded-xl overflow-hidden border border-border h-72">
                {events.length > 0 && events[events.length - 1].latitude ? (
                  <iframe
                    title="Truck Location"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${events[events.length - 1].longitude}!3d${events[events.length - 1].latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1600000000000`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">{t("tracking_map_unavailable")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default Tracking;
