import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, Award, Users, Target } from "lucide-react";

const values = [
  { icon: Shield, title: "Reliability", desc: "Consistent, dependable service you can count on every time." },
  { icon: Zap, title: "Speed", desc: "Efficient routes and processes for fastest possible delivery." },
  { icon: Clock, title: "Safety", desc: "GPS tracking, insured cargo, and trained drivers for every trip." },
];

const team = [
  { name: "V. Ramesh", role: "Founder & MD", initials: "VR" },
  { name: "S. Lakshmi", role: "Operations Head", initials: "SL" },
  { name: "K. Suresh", role: "Fleet Manager", initials: "KS" },
  { name: "P. Anand", role: "Customer Relations", initials: "PA" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-secondary section-padding">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            About Vijayalakshmi Roadlines
          </motion.h1>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg">
            Over 15 years of excellence in road transportation and logistics across India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2008, Vijayalakshmi Roadlines started with a small fleet of 5 trucks serving local routes in Telangana. Through dedication to reliability and customer satisfaction, we've grown into one of the most trusted logistics companies in South India.
            </p>
            <p className="text-muted-foreground">
              Today, with a fleet of 500+ trucks and presence across 28 states, we deliver over 10,000 consignments monthly while maintaining our core promise — reliability, safety, and on-time delivery.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Award, label: "15+ Years", sub: "Experience" },
              { icon: Users, label: "2000+", sub: "Clients" },
              { icon: Target, label: "98%", sub: "On-Time Rate" },
              { icon: Shield, label: "ISO", sub: "Certified" },
            ].map((item) => (
              <div key={item.label} className="bg-muted rounded-xl p-6 text-center">
                <item.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-xl font-bold text-foreground">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 card-shadow"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide reliable, efficient, and cost-effective logistics solutions that empower businesses across India to move goods seamlessly and grow confidently.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 card-shadow"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              To be India's most trusted and technology-driven road logistics company, setting new standards for speed, safety, and customer experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding container mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Leadership Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full gradient-secondary flex items-center justify-center mx-auto mb-3 text-secondary-foreground font-bold text-xl">
                  {member.initials}
                </div>
                <div className="font-semibold text-foreground">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
