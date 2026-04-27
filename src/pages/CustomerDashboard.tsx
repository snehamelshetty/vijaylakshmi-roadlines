import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Package, MapPin, FileText, LogOut, Search, Truck, CheckCircle2, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";

const statusColors: Record<string, string> = {
  booked: "bg-blue-100 text-blue-800",
  picked_up: "bg-yellow-100 text-yellow-800",
  in_transit: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
};

const statusSteps = [
  { key: "booked", icon: Package, label: "Booked" },
  { key: "picked_up", icon: Truck, label: "Picked Up" },
  { key: "in_transit", icon: MapPin, label: "In Transit" },
  { key: "delivered", icon: CheckCircle2, label: "Delivered" },
];

const CustomerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [trackingEvents, setTrackingEvents] = useState<any[]>([]);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchBookings(session.user.id);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchBookings = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const viewTracking = async (booking: any) => {
    setSelectedBooking(booking);
    const { data } = await supabase
      .from("tracking_events")
      .select("*")
      .eq("booking_id", booking.id)
      .order("created_at", { ascending: true });
    setTrackingEvents(data || []);
  };

  const downloadInvoice = (booking: any) => {
    const invoiceContent = `
INVOICE
========================================
Vijayalakshmi Roadlines
Solapur, Maharashtra 413001

Tracking ID: ${booking.tracking_id}
Date: ${new Date(booking.created_at).toLocaleDateString()}

Customer: ${booking.customer_name}
Phone: ${booking.customer_phone}

Pickup: ${booking.pickup_location}
Delivery: ${booking.delivery_location}
Truck Type: ${booking.truck_type}
Weight: ${booking.weight || "N/A"} Tons
Pickup Date: ${new Date(booking.pickup_date).toLocaleDateString()}

Status: ${booking.status.replace("_", " ").toUpperCase()}

========================================
Thank you for choosing Vijayalakshmi Roadlines!
    `.trim();

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${booking.tracking_id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success(t("admin_logged_out"));
    navigate("/");
  };

  const currentStatusIndex = selectedBooking
    ? statusSteps.findIndex((s) => s.key === selectedBooking.status)
    : -1;

  return (
    <Layout>
      <section className="gradient-primary section-padding">
        <div className="container mx-auto text-center py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2"
          >
            {t("dashboard_title")}
          </motion.h1>
          <p className="text-primary-foreground/80">
            {user?.email}
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> {t("admin_logout")}
          </Button>
        </div>
      </section>

      <section className="section-padding container mx-auto">
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="bookings">
              <Package className="w-4 h-4 mr-1" /> {t("dashboard_bookings")}
            </TabsTrigger>
            <TabsTrigger value="tracking">
              <MapPin className="w-4 h-4 mr-1" /> {t("dashboard_tracking")}
            </TabsTrigger>
            <TabsTrigger value="invoices">
              <FileText className="w-4 h-4 mr-1" /> {t("dashboard_invoices")}
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">{t("auth_loading")}</div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">{t("dashboard_no_bookings")}</p>
                  <Button variant="blue" className="mt-4" onClick={() => navigate("/book")}>
                    {t("nav_book")}
                  </Button>
                </div>
              ) : (
                bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-xl p-5 border border-border card-shadow"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-foreground">{booking.tracking_id}</span>
                          <Badge className={statusColors[booking.status] || "bg-muted"}>
                            {booking.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {booking.pickup_location} → {booking.delivery_location}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("pickup_date")}: {new Date(booking.pickup_date).toLocaleDateString()}
                          {" · "}{booking.truck_type}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => viewTracking(booking)}>
                          <Search className="w-3 h-3" /> {t("tracking_track")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => downloadInvoice(booking)}>
                          <Download className="w-3 h-3" /> {t("dashboard_invoice")}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking">
            {selectedBooking ? (
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-shadow">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {t("tracking_shipment_details")} — {selectedBooking.tracking_id}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">{t("pickup_location")}:</span> <span className="text-foreground ml-1">{selectedBooking.pickup_location}</span></div>
                    <div><span className="text-muted-foreground">{t("drop_location")}:</span> <span className="text-foreground ml-1">{selectedBooking.delivery_location}</span></div>
                    <div><span className="text-muted-foreground">{t("tracking_status")}:</span> <span className="text-secondary font-semibold ml-1 capitalize">{selectedBooking.status.replace("_", " ")}</span></div>
                    <div><span className="text-muted-foreground">{t("pickup_date")}:</span> <span className="text-foreground ml-1">{new Date(selectedBooking.pickup_date).toLocaleDateString()}</span></div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-card rounded-xl p-6 border border-border card-shadow">
                  <h3 className="text-lg font-bold text-foreground mb-6">{t("tracking_timeline")}</h3>
                  <div className="flex items-center justify-between mb-8">
                    {statusSteps.map((step, i) => (
                      <div key={step.key} className="flex flex-col items-center relative flex-1">
                        {i < statusSteps.length - 1 && (
                          <div className={`absolute top-5 left-1/2 w-full h-1 ${i < currentStatusIndex ? "bg-secondary" : "bg-border"}`} />
                        )}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                          i <= currentStatusIndex ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs mt-2 font-medium ${i <= currentStatusIndex ? "text-secondary" : "text-muted-foreground"}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {trackingEvents.length > 0 && (
                    <div className="space-y-3 border-t border-border pt-4">
                      {trackingEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-3">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-foreground capitalize">
                              {event.status.replace("_", " ")}
                              {event.location && ` — ${event.location}`}
                            </div>
                            {event.description && <p className="text-xs text-muted-foreground">{event.description}</p>}
                            <span className="text-xs text-muted-foreground">{new Date(event.created_at).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Map */}
                <div className="bg-card rounded-xl p-6 border border-border card-shadow">
                  <h3 className="text-lg font-bold text-foreground mb-4">{t("tracking_live_location")}</h3>
                  <div className="rounded-xl overflow-hidden border border-border h-72">
                    {trackingEvents.length > 0 && trackingEvents[trackingEvents.length - 1].latitude ? (
                      <iframe
                        title="Truck Location"
                        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${trackingEvents[trackingEvents.length - 1].longitude}!3d${trackingEvents[trackingEvents.length - 1].latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1600000000000`}
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
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

                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  ← {t("dashboard_back_to_bookings")}
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">{t("dashboard_select_booking")}</p>
              </div>
            )}
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">{t("dashboard_no_bookings")}</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="bg-card rounded-xl p-5 border border-border card-shadow flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-foreground">{booking.tracking_id}</span>
                      <p className="text-sm text-muted-foreground">
                        {booking.pickup_location} → {booking.delivery_location} · {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button size="sm" variant="blue" onClick={() => downloadInvoice(booking)}>
                      <Download className="w-4 h-4" /> {t("dashboard_download_invoice")}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default CustomerDashboard;
