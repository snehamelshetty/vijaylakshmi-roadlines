import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Truck, Package, CheckCircle2, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const AdminOverview = () => {
  const [stats, setStats] = useState({ trucks: 0, bookings: 0, delivered: 0, pending: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const [trucksRes, bookingsRes] = await Promise.all([
        supabase.from("trucks").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const bookings = bookingsRes.data || [];
      const allBookings = await supabase.from("bookings").select("status");
      const allData = allBookings.data || [];

      setStats({
        trucks: trucksRes.count || 0,
        bookings: allData.length,
        delivered: allData.filter((b: any) => b.status === "delivered").length,
        pending: allData.filter((b: any) => b.status !== "delivered" && b.status !== "cancelled").length,
      });
      setRecentBookings(bookings);
    };
    fetchData();
  }, []);

  const statCards = [
    { icon: Truck, label: t("admin_total_trucks"), value: stats.trucks, color: "text-secondary" },
    { icon: Package, label: t("admin_total_bookings"), value: stats.bookings, color: "text-primary" },
    { icon: CheckCircle2, label: t("admin_delivered"), value: stats.delivered, color: "text-[hsl(142,70%,40%)]" },
    { icon: Clock, label: t("admin_pending"), value: stats.pending, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-card rounded-xl p-5 border border-border card-shadow">
            <card.icon className={`w-8 h-8 ${card.color} mb-2`} />
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <div className="text-sm text-muted-foreground">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-6 border border-border card-shadow">
        <h2 className="text-lg font-semibold text-foreground mb-4">{t("admin_recent_bookings")}</h2>
        {recentBookings.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("admin_no_bookings")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t("tracking_id_label")}</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t("full_name")}</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t("pickup_location")}</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t("drop_location")}</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">{t("tracking_status")}</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0">
                    <td className="py-2 px-3 font-mono text-xs">{b.tracking_id}</td>
                    <td className="py-2 px-3">{b.customer_name}</td>
                    <td className="py-2 px-3">{b.pickup_location}</td>
                    <td className="py-2 px-3">{b.delivery_location}</td>
                    <td className="py-2 px-3">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
