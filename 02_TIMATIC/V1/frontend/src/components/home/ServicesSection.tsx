import { FileCheck, Clock, Globe, HelpCircle, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: FileCheck,
    title: "Vérification des conditions",
    description: "Consultez instantanément les exigences de visa selon votre nationalité et type de document.",
    href: "/#recherche",
  },
  {
    icon: Clock,
    title: "Information en temps réel",
    description: "Données actualisées régulièrement pour refléter les dernières réglementations en vigueur.",
    href: "/services",
  },
  {
    icon: Globe,
    title: "Couverture mondiale",
    description: "Informations disponibles pour tous les pays et territoires du monde.",
    href: "/services",
  },
  {
    icon: HelpCircle,
    title: "Assistance FAQ",
    description: "Trouvez rapidement des réponses à vos questions les plus fréquentes.",
    href: "/faq",
  },
  {
    icon: Shield,
    title: "Source officielle",
    description: "Informations vérifiées et validées par les autorités compétentes.",
    href: "/about",
  },
  {
    icon: Users,
    title: "Support personnalisé",
    description: "Contactez notre équipe pour toute demande d'information complémentaire.",
    href: "/contact",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
            Nos Services
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comment pouvons-nous vous aider ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre plateforme vous accompagne dans toutes vos démarches d'information relatives à l'entrée sur le territoire sénégalais.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group card-institutional p-6 lg:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
