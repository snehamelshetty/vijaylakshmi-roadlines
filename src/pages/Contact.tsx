import { useState } from "react";
import Layout from "@/components/Layout";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteSetting } from "@/hooks/useSiteContent";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useLanguage();
  const { value: contact } = useSiteSetting("contact");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error(t("toast_fill_required"));
      return;
    }
    toast.success(t("toast_message_sent"));
    setName(""); setEmail(""); setPhone(""); setMessage("");
  };

  const contactItems = [
    { icon: MapPin, title: t("office_address"), desc: contact.address },
    { icon: Phone, title: t("phone"), desc: contact.phone },
    { icon: Mail, title: t("email"), desc: contact.email },
    { icon: Clock, title: t("business_hours"), desc: contact.hours },
  ];

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
            {t("contact_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg"
          >
            {t("contact_subtitle")}
          </motion.p>
        </div>
      </section>

      <ParallaxSection speed={0.1}>
        <section className="section-padding container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.form
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-card rounded-xl p-8 card-shadow border border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("send_message")}</h2>
              <div className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">{t("full_name")} *</Label>
                  <Input id="name" placeholder={t("full_name")} value={name} onChange={(e) => setName(e.target.value)} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")} *</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <Label htmlFor="message">{t("message")} *</Label>
                  <Textarea id="message" placeholder={t("message")} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                </motion.div>
                <Button type="submit" variant="blue" size="lg">
                  <Send className="w-4 h-4" /> {t("send")}
                </Button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t("get_in_touch")}</h2>
                <div className="space-y-5">
                  {contactItems.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{item.title}</div>
                        <div className="text-muted-foreground text-sm">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden border border-border h-64"
              >
                <iframe
                  title="Office Location"
                  src={contact.map_embed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>
    </Layout>
  );
};

export default Contact;
