import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileCheck, Clock, Globe, Shield, Users, Building, ArrowRight } from "lucide-react";

const nosServices = [
  {
    icon: FileCheck,
    title: "Vérification des conditions d'entrée",
    description: "Consultez instantanément les exigences de visa selon votre nationalité et votre type de document de voyage. Notre système vous fournit des informations précises et à jour.",
    features: [
      "Résultats instantanés",
      "Informations sur les documents requis",
      "Durée de séjour autorisée",
      "Types de visa applicables",
    ],
  },
  {
    icon: Clock,
    title: "Information en temps réel",
    description: "Nos données sont actualisées régulièrement pour refléter les dernières réglementations et modifications des conditions d'entrée au Sénégal.",
    features: [
      "Mises à jour régulières",
      "Alertes sur les changements",
      "Historique des modifications",
      "Sources officielles vérifiées",
    ],
  },
  {
    icon: Globe,
    title: "Couverture mondiale",
    description: "Notre base de données couvre l'ensemble des pays et territoires du monde, vous permettant d'obtenir des informations quel que soit votre pays d'origine.",
    features: [
      "195+ pays référencés",
      "Tous types de documents",
      "Accords bilatéraux",
      "Zones de libre circulation",
    ],
  },
  {
    icon: Shield,
    title: "Source officielle",
    description: "Toutes nos informations sont vérifiées et validées par les autorités compétentes sénégalaises, garantissant leur fiabilité.",
    features: [
      "Validation officielle",
      "Conformité réglementaire",
      "Données certifiées",
      "Partenariat institutionnel",
    ],
  },
];

const NosServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="bg-institutional text-primary-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-secondary font-semibold uppercase tracking-wider mb-4">
                Nos Services
              </p>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                À votre service
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Découvrez l'ensemble des services mis à votre disposition pour faciliter vos démarches d'information relatives à l'entrée au Sénégal.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16 lg:space-y-24">
              {nosServices.map((service, index) => (
                <div
                  key={service.title}
                  className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
                >
                  <div className="flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-foreground">
                          <div className="w-2 h-2 rounded-full bg-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <div className="card-elevated p-8 lg:p-12 bg-muted/30">
                      <div className="aspect-square max-w-sm mx-auto flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-primary/5 flex items-center justify-center">
                          <service.icon className="w-24 h-24 text-primary/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Prêt à vérifier vos conditions d'accès ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Utilisez notre moteur de recherche pour obtenir instantanément les informations relatives à votre situation.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/#recherche">
                  Vérifier maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NosServices;
