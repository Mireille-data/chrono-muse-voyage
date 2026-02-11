import { motion } from "framer-motion";

const stats = [
  { value: "3", label: "Époques disponibles" },
  { value: "2 847", label: "Voyageurs satisfaits" },
  { value: "99.9%", label: "Taux de retour sécurisé" },
  { value: "24/7", label: "Support temporel" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-sans uppercase tracking-[0.2em] text-sm mb-3">
              À propos
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
              Pionniers du <span className="gold-gradient-text">voyage temporel</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Fondée en 2089, TimeTravel Agency est la première agence de voyage temporel agréée par le Consortium Chrono-Spatial International. Notre technologie brevetée de portails quantiques garantit des voyages sûrs et inoubliables.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chaque destination est minutieusement préparée par nos historiens et nos ingénieurs temporels pour vous offrir une immersion totale, sans altérer le cours de l'Histoire.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="gold-gradient-text font-serif text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
