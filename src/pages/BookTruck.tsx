import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Truck, Calculator, ArrowRight, IndianRupee } from "lucide-react";
import { toast } from "sonner";

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
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const calculateRate = () => {
    if (!truckType || !weight) {
      toast.error("Please select truck type and enter weight.");
      return;
    }
    const truck = truckTypes.find((t) => t.value === truckType);
    if (!truck) return;
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0) {
      toast.error("Please enter a valid weight.");
      return;
    }
    // Mock distance-based calculation
    const baseCost = w * truck.rate * 100;
    const cost = Math.round(baseCost + 2000); // base + loading charges
    setEstimatedCost(cost);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !drop || !truckType || !weight || !date) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Booking request submitted! We'll contact you shortly.");
  };

  return (
    <Layout>
      <section className="gradient-secondary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            Book a Truck
          </motion.h1>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg">
            Fill in the details below to get an instant rate estimate and book your truck.
          </p>
        </div>
      </section>

      <section className="section-padding container mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 card-shadow border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-secondary" /> Booking Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input id="pickup" placeholder="e.g., Hyderabad" value={pickup} onChange={(e) => setPickup(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drop">Drop Location</Label>
                  <Input id="drop" placeholder="e.g., Mumbai" value={drop} onChange={(e) => setDrop(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Truck Type</Label>
                  <Select value={truckType} onValueChange={setTruckType}>
                    <SelectTrigger><SelectValue placeholder="Select truck type" /></SelectTrigger>
                    <SelectContent>
                      {truckTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Load Weight (Tons)</Label>
                  <Input id="weight" type="number" placeholder="e.g., 5" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Pickup Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={calculateRate}>
                  <Calculator className="w-4 h-4" /> Calculate Rate
                </Button>
                <Button type="submit" variant="blue">
                  Submit Booking <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.form>
          </div>

          {/* Rate Estimate */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-8 card-shadow border border-border sticky top-24"
            >
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-secondary" /> Rate Estimate
              </h3>
              {estimatedCost !== null ? (
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">
                    ₹{estimatedCost.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    *Estimated cost including loading charges. Final rate may vary based on route and availability.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Transport charges</span>
                      <span>₹{(estimatedCost - 2000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Loading charges</span>
                      <span>₹2,000</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                      <span>Total</span>
                      <span>₹{estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Fill in truck type and weight, then click "Calculate Rate" to see your estimate.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookTruck;
