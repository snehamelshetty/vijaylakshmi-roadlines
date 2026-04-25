import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { uploadSiteAsset } from "@/hooks/useSiteContent";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
}

const ImageUpload = ({ value, onChange, folder, label }: Props) => {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadSiteAsset(file, folder);
    setUploading(false);
    if (url) {
      onChange(url);
      toast.success("Uploaded");
    } else {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      <div className="flex items-center gap-3">
        {value && (
          <div className="relative">
            <img src={value} alt="preview" className="w-16 h-16 rounded-lg object-cover border border-border" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card hover:bg-muted text-sm">
            <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload"}
          </span>
        </label>
      </div>
      <Input
        placeholder="Or paste image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ImageUpload;
