import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToDestinations = () => {
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-sans uppercase tracking-[0.3em] text-sm mb-6"
        >
          Voyagez à travers le temps
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="gold-gradient-text">TimeTravel</span>
          <br />
          <span className="text-foreground">Agency</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          Explorez les époques les plus fascinantes de l'histoire. 
          Paris 1889, le Crétacé, Florence 1504 — votre aventure temporelle commence ici.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToDestinations}
            className="gold-gradient-bg text-primary-foreground font-semibold px-8 py-4 rounded-lg text-lg hover:opacity-90 transition-opacity gold-glow"
          >
            Découvrir nos destinations
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-primary/40 text-primary px-8 py-4 rounded-lg text-lg hover:bg-primary/10 transition-colors"
          >
            En savoir plus
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/60 cursor-pointer"
        onClick={scrollToDestinations}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
