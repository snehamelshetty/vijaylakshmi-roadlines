import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ParallaxSection from "@/components/ParallaxSection";
import heroImage from "@/assets/hero-trucks.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Truck, Package, Clock, Shield, MapPin, Star, ArrowRight,
  Warehouse, Zap, Users
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const stats = [
    { icon: Truck, value: "500+", label: t("stat_trucks") },
    { icon: MapPin, value: "28+", label: t("stat_states") },
    { icon: Package, value: "10K+", label: t("stat_deliveries") },
    { icon: Users, value: "2000+", label: t("stat_clients") },
  ];

  const services = [
    { icon: Truck, title: t("home_ftl_title"), desc: t("home_ftl_desc") },
    { icon: Package, title: t("home_ptl_title"), desc: t("home_ptl_desc") },
    { icon: Warehouse, title: t("home_warehouse_title"), desc: t("home_warehouse_desc") },
    { icon: Zap, title: t("home_express_title"), desc: t("home_express_desc") },
  ];

  const testimonials = [
    { name: "Rajesh Kumar", company: "ABC Industries", text: "Vijayalakshmi Roadlines has been our logistics partner for 5 years. Exceptional reliability and service!", rating: 5 },
    { name: "Priya Sharma", company: "XYZ Exports", text: "Their fleet management and tracking system gives us complete visibility. Highly recommended!", rating: 5 },
    { name: "Suresh Reddy", company: "Reddy Enterprises", text: "On-time delivery, competitive rates, and professional team. The best in the business.", rating: 5 },
  ];

  return (
    <Layout>
      {/* Hero with Parallax */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImage} alt="Fleet of trucks on highway" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>
        <motion.div className="relative container mx-auto px-4 py-20" style={{ opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              {t("hero_badge")}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-card mb-6 leading-tight">
              {t("hero_title_1")}{" "}
              <span className="text-primary">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg text-card/80 mb-8 max-w-lg">
              {t("hero_desc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/book">
                  {t("hero_book")} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/services">{t("hero_services")}</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 text-center card-shadow"
            >
              <stat.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview with Parallax */}
      <ParallaxSection speed={0.15} className="mt-8">
        <section className="section-padding container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("home_services_title")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("home_services_desc")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 card-shadow group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                <Link to="/services" className="text-secondary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  {t("learn_more")} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxSection>

      {/* Why Choose Us with Parallax */}
      <ParallaxSection speed={0.1}>
        <section className="section-padding gradient-secondary">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-3">{t("why_choose_title")}</h2>
              <p className="text-secondary-foreground/80 max-w-xl mx-auto">
                {t("why_choose_desc")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: t("safe_secure"), desc: t("safe_secure_desc") },
                { icon: Clock, title: t("on_time"), desc: t("on_time_desc") },
                { icon: Star, title: t("best_rates"), desc: t("best_rates_desc") },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary-foreground/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold text-secondary-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-secondary-foreground/80 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Testimonials */}
      <section className="section-padding container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("testimonials_title")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tl, i) => (
            <motion.div
              key={tl.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 card-shadow"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: tl.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-4 italic">"{tl.text}"</p>
              <div>
                <div className="font-semibold text-foreground text-sm">{tl.name}</div>
                <div className="text-xs text-muted-foreground">{tl.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("ready_to_ship")}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              {t("ready_to_ship_desc")}
            </p>
            <Button variant="blue" size="lg" asChild>
              <Link to="/book">
                {t("book_truck_now")} <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
