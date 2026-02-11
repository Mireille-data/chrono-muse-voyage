const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border/30 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-serif text-2xl font-bold mb-4">
              <span className="gold-gradient-text">TimeTravel</span>{" "}
              <span className="text-foreground">Agency</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La première agence de voyage temporel certifiée. Explorez le passé en toute sécurité.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Paris 1889 — Belle Époque</li>
              <li>Crétacé -65M — Ère des Dinosaures</li>
              <li>Florence 1504 — Renaissance</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contact@timetravel.agency</li>
              <li>+33 1 00 00 2089</li>
              <li>42 Rue du Temps, Paris, 2089</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
          © 2089 TimeTravel Agency. Tous droits réservés à travers toutes les époques.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
