import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editStatus, setEditStatus] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const { t } = useLanguage();

  const fetchBookings = async () => {
    let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    const { data } = await query;
    setBookings(data || []);
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const handleUpdateStatus = async () => {
    if (!selected || !editStatus) return;

    const oldStatus = selected.status;
    const { error } = await supabase.from("bookings").update({ status: editStatus }).eq("id", selected.id);
    if (error) { toast.error(error.message); return; }

    // Add tracking event
    await supabase.from("tracking_events").insert({
      booking_id: selected.id,
      status: editStatus,
      location: eventLocation || null,
      description: eventDesc || `Status updated to ${editStatus.replace("_", " ")}`,
    });

    // Send email notification (fire-and-forget)
    supabase.functions.invoke("notify-status-change", {
      body: { booking_id: selected.id, new_status: editStatus, old_status: oldStatus },
    }).then(({ error: fnErr }) => {
      if (fnErr) console.error("Email notification failed:", fnErr);
    });

    toast.success(t("admin_booking_updated"));
    setEditOpen(false);
    setSelected(null);
    setEventLocation("");
    setEventDesc("");
    fetchBookings();
  };

  const openStatusEdit = (booking: any) => {
    setSelected(booking);
    setEditStatus(booking.status);
    setEditOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold text-foreground">{t("admin_manage_bookings")}</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("admin_all_status")}</SelectItem>
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-xl border border-border card-shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("tracking_id_label")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("full_name")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("phone")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("pickup_location")} → {t("drop_location")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("truck_type")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("pickup_date")}</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">{t("tracking_status")}</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">{t("admin_actions")}</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">{t("admin_no_bookings")}</td></tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">{b.tracking_id}</td>
                  <td className="py-3 px-4 font-medium">{b.customer_name}</td>
                  <td className="py-3 px-4">{b.customer_phone}</td>
                  <td className="py-3 px-4 text-xs">{b.pickup_location} → {b.delivery_location}</td>
                  <td className="py-3 px-4">{b.truck_type}</td>
                  <td className="py-3 px-4">{new Date(b.pickup_date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      b.status === "delivered"
                        ? "bg-[hsl(142,70%,90%)] text-[hsl(142,70%,30%)]"
                        : b.status === "cancelled"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openStatusEdit(b)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Status Update Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("admin_update_status")}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <strong>{selected.tracking_id}</strong> — {selected.customer_name}
              </div>
              <div className="space-y-2">
                <Label>{t("admin_new_status")}</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="picked_up">Picked Up</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("admin_event_location")}</Label>
                <Input value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="e.g., Pune Warehouse" />
              </div>
              <div className="space-y-2">
                <Label>{t("admin_event_desc")}</Label>
                <Textarea value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} placeholder="Optional description..." rows={2} />
              </div>
              <Button variant="blue" className="w-full" onClick={handleUpdateStatus}>
                {t("admin_save_changes")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
