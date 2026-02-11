import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";
import parisImg from "@/assets/paris-1889.jpg";
import cretaceousImg from "@/assets/cretaceous.jpg";
import florenceImg from "@/assets/florence-1504.jpg";

const destinations = [
  {
    title: "Paris 1889",
    era: "Belle Époque",
    description: "Vivez l'effervescence de l'Exposition Universelle et admirez la Tour Eiffel lors de son inauguration. Plongez dans le Paris de Gustave Eiffel et des impressionnistes.",
    details: [
      "Inauguration de la Tour Eiffel — vue panoramique exclusive",
      "Dîner au Pavillon de l'Exposition Universelle",
      "Rencontre avec les grands artistes impressionnistes",
      "Promenade en calèche sur les Champs-Élysées",
    ],
    price: "12 500 €",
    image: parisImg,
  },
  {
    title: "Crétacé -65M",
    era: "Ère des Dinosaures",
    description: "Une aventure extrême au cœur de la préhistoire. Observez les dinosaures dans leur habitat naturel depuis nos capsules d'observation sécurisées.",
    details: [
      "Safari dinosaures en capsule blindée tout-terrain",
      "Observation d'un T-Rex dans son territoire",
      "Survol des plaines en aéronef furtif",
      "Collecte de fossiles exclusifs (répliques autorisées)",
    ],
    price: "18 900 €",
    image: cretaceousImg,
  },
  {
    title: "Florence 1504",
    era: "Renaissance Italienne",
    description: "Marchez dans les pas de Michel-Ange et Léonard de Vinci. Découvrez Florence à l'apogée de la Renaissance, entre art, science et splendeur architecturale.",
    details: [
      "Visite privée de l'atelier de Michel-Ange",
      "Audience avec Laurent de Médicis",
      "Cours de peinture avec un maître de la Renaissance",
      "Banquet dans un palazzo florentin",
    ],
    price: "14 200 €",
    image: florenceImg,
  },
];

const DestinationsSection = () => {
  return (
    <section id="destinations" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans uppercase tracking-[0.2em] text-sm mb-3">
            Nos Destinations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trois époques, <span className="gold-gradient-text">mille merveilles</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Chaque voyage est une expérience unique, soigneusement orchestrée pour vous faire vivre l'Histoire comme jamais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.title} {...dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
