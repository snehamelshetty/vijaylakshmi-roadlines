import Layout from "@/components/Layout";
import ParallaxSection from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, Award, Users, Target } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Shield, title: t("reliability"), desc: t("reliability_desc") },
    { icon: Zap, title: t("speed"), desc: t("speed_desc") },
    { icon: Clock, title: t("safety"), desc: t("safety_desc") },
  ];

  const team = [
    { name: "V. Ramesh", role: t("founder_md"), initials: "VR" },
    { name: "S. Lakshmi", role: t("operations_head"), initials: "SL" },
    { name: "K. Suresh", role: t("fleet_manager"), initials: "KS" },
    { name: "P. Anand", role: t("customer_relations"), initials: "PA" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-secondary section-padding overflow-hidden">
        <div className="container mx-auto text-center py-12">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4"
          >
            {t("about_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-secondary-foreground/80 max-w-2xl mx-auto text-lg"
          >
            {t("about_subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <ParallaxSection speed={0.12}>
        <section className="section-padding container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">{t("our_story")}</h2>
              <p className="text-muted-foreground mb-4">{t("about_story_1")}</p>
              <p className="text-muted-foreground">{t("about_story_2")}</p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Award, label: "15+", sub: t("experience") },
                { icon: Users, label: "2000+", sub: t("clients") },
                { icon: Target, label: "98%", sub: t("on_time_rate") },
                { icon: Shield, label: "ISO", sub: t("certified") },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-muted rounded-xl p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <item.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <div className="text-xl font-bold text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 card-shadow"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">{t("our_mission")}</h3>
            <p className="text-muted-foreground">{t("mission_text")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 card-shadow"
          >
            <h3 className="text-2xl font-bold text-foreground mb-3">{t("our_vision")}</h3>
            <p className="text-muted-foreground">{t("vision_text")}</p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <ParallaxSection speed={0.1}>
        <section className="section-padding container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-10"
          >
            {t("core_values")}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="text-center p-6"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4"
                >
                  <v.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </ParallaxSection>

      {/* Team */}
      <section className="section-padding bg-muted overflow-hidden">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-10"
          >
            {t("leadership_team")}
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ scale: 1.08, y: -5 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-20 h-20 rounded-full gradient-secondary flex items-center justify-center mx-auto mb-3 text-secondary-foreground font-bold text-xl shadow-lg"
                >
                  {member.initials}
                </motion.div>
                <div className="font-semibold text-foreground">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
