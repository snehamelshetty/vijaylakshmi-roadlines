import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/admin/ImageUpload";

const empty = { name: "", role: "", bio: "", photo_url: "", display_order: 0 };

const AdminTeam = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [open, setOpen] = useState(false);

  const fetchMembers = async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order");
    setMembers(data || []);
  };

  useEffect(() => { fetchMembers(); }, []);

  const save = async () => {
    if (!form.name || !form.role) { toast.error("Name and role required"); return; }
    const payload = {
      name: form.name,
      role: form.role,
      bio: form.bio,
      photo_url: form.photo_url,
      display_order: parseInt(form.display_order) || 0,
    };
    const res = editing
      ? await supabase.from("team_members").update(payload).eq("id", editing.id)
      : await supabase.from("team_members").insert(payload);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success(editing ? "Updated" : "Added");
    setOpen(false); setEditing(null); setForm(empty); fetchMembers();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    const { error } = await supabase.from("team_members").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchMembers(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Team Members</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="blue" size="sm" onClick={() => { setEditing(null); setForm(empty); }}>
              <Plus className="w-4 h-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editing ? "Edit Member" : "Add Member"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
              <div className="space-y-2"><Label>Bio</Label><Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <ImageUpload label="Photo" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} folder="team" />
              <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} /></div>
              <Button variant="blue" className="w-full" onClick={save}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              {m.photo_url ? (
                <img src={m.photo_url} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full gradient-secondary flex items-center justify-center text-secondary-foreground font-bold">
                  {m.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <div className="flex-1">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
            </div>
            {m.bio && <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{m.bio}</p>}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setEditing(m); setForm({ ...m, display_order: m.display_order || 0 }); setOpen(true); }}>
                <Pencil className="w-4 h-4" /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(m.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {members.length === 0 && <div className="text-muted-foreground text-sm">No team members yet.</div>}
      </div>
    </div>
  );
};

export default AdminTeam;
