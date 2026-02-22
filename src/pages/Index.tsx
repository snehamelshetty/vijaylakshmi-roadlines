import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-trucks.jpg";
import { motion } from "framer-motion";
import {
  Truck, Package, Clock, Shield, MapPin, Star, ArrowRight,
  Warehouse, Zap, Users
} from "lucide-react";

const stats = [
  { icon: Truck, value: "500+", label: "Trucks" },
  { icon: MapPin, value: "28+", label: "States Covered" },
  { icon: Package, value: "10K+", label: "Deliveries/Month" },
  { icon: Users, value: "2000+", label: "Happy Clients" },
];

const services = [
  { icon: Truck, title: "Full Truck Load", desc: "Dedicated trucks for your large shipments across India." },
  { icon: Package, title: "Part Load (PTL)", desc: "Cost-effective shared transportation for smaller loads." },
  { icon: Warehouse, title: "Warehousing", desc: "Secure storage solutions with easy access and management." },
  { icon: Zap, title: "Express Delivery", desc: "Time-critical deliveries with guaranteed timelines." },
];

const testimonials = [
  { name: "Rajesh Kumar", company: "ABC Industries", text: "Vijayalakshmi Roadlines has been our logistics partner for 5 years. Exceptional reliability and service!", rating: 5 },
  { name: "Priya Sharma", company: "XYZ Exports", text: "Their fleet management and tracking system gives us complete visibility. Highly recommended!", rating: 5 },
  { name: "Suresh Reddy", company: "Reddy Enterprises", text: "On-time delivery, competitive rates, and professional team. The best in the business.", rating: 5 },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Fleet of trucks on highway" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-block gradient-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              India's Trusted Logistics Partner
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-card mb-6 leading-tight">
              Reliable Logistics,{" "}
              <span className="text-primary">Delivered.</span>
            </h1>
            <p className="text-lg text-card/80 mb-8 max-w-lg">
              End-to-end transportation solutions with a fleet of 500+ trucks covering 28+ states. Your cargo, our commitment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/book">
                  Book a Truck <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-10 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
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

      {/* Services Preview */}
      <section className="section-padding container mx-auto mt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive logistics solutions tailored to your business needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 card-shadow group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
              <Link to="/services" className="text-secondary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding gradient-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-3">Why Choose Us?</h2>
            <p className="text-secondary-foreground/80 max-w-xl mx-auto">
              Trusted by 2000+ businesses across India for reliable logistics.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Safe & Secure", desc: "GPS-tracked fleet with insurance coverage for every shipment." },
              { icon: Clock, title: "On-Time Delivery", desc: "98% on-time delivery rate with real-time tracking updates." },
              { icon: Star, title: "Best Rates", desc: "Competitive pricing with transparent billing, no hidden charges." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
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

      {/* Testimonials */}
      <section className="section-padding container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 card-shadow"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-4 italic">"{t.text}"</p>
              <div>
                <div className="font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Ship?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Get an instant quote and book your truck in minutes.
          </p>
          <Button variant="blue" size="lg" asChild>
            <Link to="/book">
              Book a Truck Now <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
