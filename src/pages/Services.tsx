import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Truck, Package, Warehouse, Settings, Zap, Shield, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Road Transportation",
    desc: "Comprehensive road transport solutions connecting all major cities and towns across India with our modern fleet.",
  },
  {
    icon: Package,
    title: "Full Truck Load (FTL)",
    desc: "Dedicated trucks exclusively for your cargo. Ideal for large shipments requiring direct, non-stop delivery.",
  },
  {
    icon: Truck,
    title: "Part Load (PTL)",
    desc: "Cost-effective shared transportation for smaller consignments. Pay only for the space you use.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Storage",
    desc: "Secure, climate-controlled warehousing facilities with inventory management and easy accessibility.",
  },
  {
    icon: Settings,
    title: "Fleet Management",
    desc: "End-to-end fleet management solutions including maintenance, driver management, and route optimization.",
  },
  {
    icon: Zap,
    title: "Express Delivery",
    desc: "Time-critical deliveries with guaranteed timelines. Perfect for urgent shipments and perishable goods.",
  },
];

const Services = () => {
  return (
    <Layout>
      <section className="gradient-primary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            Our Services
          </motion.h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Comprehensive logistics solutions designed to keep your business moving.
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
                  Get Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-foreground mb-4">Need a Custom Solution?</h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-md mx-auto">
            Contact us to discuss tailored logistics solutions for your business.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Contact Us <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
