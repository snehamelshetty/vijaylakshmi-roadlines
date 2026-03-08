import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Truck, Package, Warehouse, Settings, Zap, Shield, ArrowRight
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
      <section className="gradient-primary section-padding overflow-hidden">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            {t("services_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-foreground/80 max-w-2xl mx-auto text-lg"
          >
            {t("services_subtitle")}
          </motion.p>
        </div>
      </section>

      <ParallaxSection speed={0.12}>
        <section className="section-padding container mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card rounded-xl p-8 card-shadow group border border-border transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-lg gradient-secondary flex items-center justify-center mb-5"
                >
                  <service.icon className="w-7 h-7 text-secondary-foreground" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.desc}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/book">
                    {t("get_quote")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </ParallaxSection>

      {/* CTA */}
      <section className="section-padding gradient-secondary overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-secondary-foreground mb-4">{t("custom_solution")}</h2>
            <p className="text-secondary-foreground/80 mb-8 max-w-md mx-auto">
              {t("custom_solution_desc")}
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">{t("contact_us")} <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
