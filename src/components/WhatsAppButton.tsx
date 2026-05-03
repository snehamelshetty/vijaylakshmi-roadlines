import { MessageCircle } from "lucide-react";
import { useSiteSetting } from "@/hooks/useSiteContent";

const WhatsAppButton = () => {
  const { value: contact } = useSiteSetting("contact");
  const phoneDigits = (contact.phone || "").replace(/\D/g, "");
  const waNumber = phoneDigits.length >= 10 ? phoneDigits : "919876543210";

  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-[hsl(0,0%,100%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
