import { useState } from "react";
import Layout from "@/components/Layout";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Truck, Calculator, ArrowRight, IndianRupee, Mail } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const truckTypes = [
  { value: "mini", label: "Mini Truck (1-2 Tons)", rate: 15 },
  { value: "14ft", label: "14ft Truck (3-5 Tons)", rate: 12 },
  { value: "20ft", label: "20ft Truck (7-10 Tons)", rate: 10 },
  { value: "trailer", label: "Trailer (15-25 Tons)", rate: 8 },
];

const BookTruck = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [truckType, setTruckType] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { t } = useLanguage();

  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUserId(session.user.id);
    });
  });

  const calculateRate = () => {
    if (!truckType || !weight) {
      toast.error(t("toast_select_truck_weight"));
      return;
    }
    const truck = truckTypes.find((tr) => tr.value === truckType);
    if (!truck) return;
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      toast.error(t("toast_valid_weight"));
      return;
    }
    const baseCost = w * truck.rate * 100;
    setEstimatedCost(Math.round(baseCost + 2000));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop || !truckType || !weight || !date || !customerName || !customerPhone) {
      toast.error(t("toast_fill_fields"));
      return;
    }
    setSubmitting(true);
    try {
      const insertData: any = {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || null,
        pickup_location: pickup,
        delivery_location: drop,
        truck_type: truckType,
        weight,
        pickup_date: date,
        status: "booked",
      };
      if (userId) insertData.user_id = userId;

      const { data, error } = await supabase.from("bookings").insert(insertData).select("tracking_id, id").single();
      if (error) throw error;
      toast.success(`${t("toast_booking_success")} Tracking ID: ${data.tracking_id}`);

      // Send booking confirmation email (fire-and-forget)
      if (customerEmail) {
        supabase.functions.invoke("send-booking-email", {
          body: { booking_id: data.id },
        }).then(({ error: fnErr }) => {
          if (fnErr) console.error("Booking email failed:", fnErr);
        });
      }

      setPickup(""); setDrop(""); setTruckType(""); setWeight(""); setDate("");
      setCustomerName(""); setCustomerPhone(""); setCustomerEmail(""); setEstimatedCost(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="gradient-secondary section-padding overflow-hidden">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            {t("book_truck_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg"
          >
            {t("book_truck_subtitle")}
          </motion.p>
        </div>
      </section>

      <ParallaxSection speed={0.08}>
        <section className="section-padding container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-8 card-shadow border border-border"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-secondary" /> {t("booking_details")}
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
                    <Label htmlFor="customerName">{t("full_name")} *</Label>
                    <Input id="customerName" placeholder={t("full_name")} value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-2">
                    <Label htmlFor="customerPhone">{t("phone")} *</Label>
                    <Input id="customerPhone" type="tel" placeholder="+91 98765 43210" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  {[
                    { id: "pickup", label: t("pickup_location"), placeholder: "e.g., Hyderabad", value: pickup, onChange: setPickup },
                    { id: "drop", label: t("drop_location"), placeholder: "e.g., Mumbai", value: drop, onChange: setDrop },
                  ].map((field, i) => (
                    <motion.div key={field.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} className="space-y-2">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input id={field.id} placeholder={field.placeholder} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                    </motion.div>
                  ))}
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                    <Label>{t("truck_type")}</Label>
                    <Select value={truckType} onValueChange={setTruckType}>
                      <SelectTrigger><SelectValue placeholder={t("select_truck_type")} /></SelectTrigger>
                      <SelectContent>
                        {truckTypes.map((tr) => (
                          <SelectItem key={tr.value} value={tr.value}>{tr.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-2">
                    <Label htmlFor="weight">{t("load_weight")}</Label>
                    <Input id="weight" type="number" placeholder="e.g., 5" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
                    <Label htmlFor="date">{t("pickup_date")}</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex flex-wrap gap-3">
                  <Button type="button" variant="outline" onClick={calculateRate}>
                    <Calculator className="w-4 h-4" /> {t("calculate_rate")}
                  </Button>
                  <Button type="submit" variant="blue" disabled={submitting}>
                    {submitting ? t("auth_loading") : t("submit_booking")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.form>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-card rounded-xl p-8 card-shadow border border-border sticky top-24"
              >
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-secondary" /> {t("rate_estimate")}
                </h3>
                {estimatedCost !== null ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="text-4xl font-bold text-secondary mb-2">
                      ₹{estimatedCost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{t("estimated_cost_note")}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{t("transport_charges")}</span>
                        <span>₹{(estimatedCost - 2000).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>{t("loading_charges")}</span>
                        <span>₹2,000</span>
                      </div>
                      <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                        <span>{t("total")}</span>
                        <span>₹{estimatedCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">{t("rate_placeholder")}</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>
    </Layout>
  );
};

export default BookTruck;
