import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const emptyTruck = { name: "", truck_type: "Mini", capacity: "", location: "", status: "available", price_per_km: "" };

const AdminTrucks = () => {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [editTruck, setEditTruck] = useState<any>(null);
  const [form, setForm] = useState(emptyTruck);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const fetchTrucks = async () => {
    const { data } = await supabase.from("trucks").select("*").order("created_at", { ascending: false });
    setTrucks(data || []);
  };

  useEffect(() => { fetchTrucks(); }, []);

  const handleSave = async () => {
    if (!form.name || !form.capacity || !form.location) {
      toast.error(t("toast_fill_required"));
      return;
    }

    const payload = {
      name: form.name,
      truck_type: form.truck_type,
      capacity: form.capacity,
      location: form.location,
      status: form.status,
      price_per_km: form.price_per_km ? parseFloat(form.price_per_km) : null,
    };

    if (editTruck) {
      const { error } = await supabase.from("trucks").update(payload).eq("id", editTruck.id);
      if (error) { toast.error(error.message); return; }
      toast.success(t("admin_truck_updated"));
    } else {
      const { error } = await supabase.from("trucks").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success(t("admin_truck_added"));
    }

    setOpen(false);
    setEditTruck(null);
    setForm(emptyTruck);
    fetchTrucks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("admin_confirm_delete"))) return;
    const { error } = await supabase.from("trucks").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(t("admin_truck_deleted"));
    fetchTrucks();
  };

  const openEdit = (truck: any) => {
    setEditTruck(truck);
    setForm({
      name: truck.name,
      truck_type: truck.truck_type,
      capacity: truck.capacity,
      location: truck.location,
      status: truck.status,
      price_per_km: truck.price_per_km?.toString() || "",
    });
    setOpen(true);
  };

  const openAdd = () => {
    setEditTruck(null);
    setForm(emptyTruck);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{t("admin_manage_trucks")}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="blue" size="sm" onClick={openAdd}>
              <Plus className="w-4 h-4" /> {t("admin_add_truck")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editTruck ? t("admin_edit_truck") : t("admin_add_truck")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("admin_truck_name")}</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Tata Ace" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("truck_type")}</Label>
                  <Select value={form.truck_type} onValueChange={(v) => setForm({ ...form, truck_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mini">Mini</SelectItem>
                      <SelectItem value="14ft">14ft</SelectItem>
                      <SelectItem value="20ft">20ft</SelectItem>
                      <SelectItem value="Trailer">Trailer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t("admin_status")}</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">{t("available")}</SelectItem>
                      <SelectItem value="booked">{t("booked")}</SelectItem>
                      <SelectItem value="maintenance">{t("admin_maintenance")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("capacity")}</Label>
                  <Input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="e.g., 1 Ton" />
                </div>
                <div className="space-y-2">
                  <Label>{t("admin_price_km")}</Label>
                  <Input type="number" value={form.price_per_km} onChange={(e) => setForm({ ...form, price_per_km: e.target.value })} placeholder="e.g., 15" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t("admin_location")}</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g., Bangalore" />
              </div>
              <Button variant="blue" className="w-full" onClick={handleSave}>
                {editTruck ? t("admin_save_changes") : t("admin_add_truck")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border card-shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("admin_truck_name")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("truck_type")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("capacity")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("admin_location")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("admin_status")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">₹/km</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">{t("admin_actions")}</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck) => (
              <tr key={truck.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="py-3 px-4 font-medium text-foreground">{truck.name}</td>
                <td className="py-3 px-4">{truck.truck_type}</td>
                <td className="py-3 px-4">{truck.capacity}</td>
                <td className="py-3 px-4">{truck.location}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                    truck.status === "available"
                      ? "bg-[hsl(142,70%,90%)] text-[hsl(142,70%,30%)]"
                      : truck.status === "booked"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {truck.status}
                  </span>
                </td>
                <td className="py-3 px-4">₹{truck.price_per_km}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(truck)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(truck.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTrucks;
