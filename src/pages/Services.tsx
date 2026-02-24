import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Truck, Package, Warehouse, Settings, Zap, Shield, ArrowRight
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Truck, title: t("road_transport"), desc: t("road_transport_desc") },
    { icon: Package, title: t("ftl"), desc: t("ftl_desc") },
    { icon: Truck, title: t("ptl"), desc: t("ptl_desc") },
    { icon: Warehouse, title: t("warehousing"), desc: t("warehousing_desc") },
    { icon: Settings, title: t("fleet_mgmt"), desc: t("fleet_mgmt_desc") },
    { icon: Zap, title: t("express"), desc: t("express_desc") },
  ];

  return (
    <Layout>
      <section className="gradient-primary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            {t("services_title")}
          </motion.h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            {t("services_subtitle")}
          </p>
        </div>
      </section>

      <section className="section-padding container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 card-shadow group hover:-translate-y-1 transition-transform duration-300 border border-border"
            >
              <div className="w-14 h-14 rounded-lg gradient-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.desc}</p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/book">
                  {t("get_quote")} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-foreground mb-4">{t("custom_solution")}</h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-md mx-auto">
            {t("custom_solution_desc")}
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">{t("contact_us")} <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
