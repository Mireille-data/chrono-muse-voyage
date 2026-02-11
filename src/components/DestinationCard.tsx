import { motion } from "framer-motion";
import { useState } from "react";

interface DestinationCardProps {
  title: string;
  era: string;
  description: string;
  details: string[];
  price: string;
  image: string;
  index: number;
}

const DestinationCard = ({ title, era, description, details, price, image, index }: DestinationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-xl overflow-hidden glass-card cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-4 right-4 gold-gradient-bg text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          {era}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <ul className="space-y-2 mb-4">
            {details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-0.5">✦</span>
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="gold-gradient-text font-serif text-xl font-bold">{price}</span>
          <span className="text-muted-foreground text-xs">
            {isExpanded ? "Cliquez pour réduire" : "Cliquez pour en savoir plus"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
