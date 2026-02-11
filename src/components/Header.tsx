import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/30" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-serif text-xl font-bold">
          <span className="gold-gradient-text">TT</span>
          <span className="text-foreground">Agency</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            ["Destinations", "destinations"],
            ["À propos", "about"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider"
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/30 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {[
                ["Destinations", "destinations"],
                ["À propos", "about"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wider text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
