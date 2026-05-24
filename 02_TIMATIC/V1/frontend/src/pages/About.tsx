import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Users, Shield, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Des informations vérifiées et validées par les autorités compétentes.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Une communication claire et accessible à tous.",
  },
  {
    icon: Users,
    title: "Service",
    description: "Un accompagnement personnalisé pour chaque visiteur.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Une amélioration continue de nos services.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="bg-institutional text-primary-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-secondary font-semibold uppercase tracking-wider mb-4">
                À propos
              </p>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                Qui sommes-nous
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Le portail officiel d'information sur les conditions d'accès au territoire sénégalais pour les ressortissants étrangers.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <p className="text-secondary font-semibold uppercase tracking-wider mb-3">
                    Notre Mission
                  </p>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    Faciliter l'accès à l'information
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Notre plateforme a été créée pour offrir aux voyageurs internationaux un accès simple, rapide et fiable aux informations relatives aux conditions d'entrée au Sénégal.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    En collaboration avec les autorités compétentes, nous mettons à disposition une base de données complète et régulièrement mise à jour, permettant à chacun de préparer sereinement son voyage vers le Sénégal.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Notre objectif est de contribuer à l'accueil chaleureux qui caractérise le Sénégal, terre de la Teranga, en simplifiant les démarches administratives pour nos visiteurs.
                  </p>
                </div>
                <div className="card-elevated p-8 lg:p-12 bg-muted/30">
                  <div className="aspect-square flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-primary/5 flex items-center justify-center">
                      <Target className="w-24 h-24 text-primary/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-secondary font-semibold uppercase tracking-wider mb-3">
                Nos Valeurs
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Les principes qui nous guident
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="card-institutional p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-institutional text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
                Prêt à découvrir le Sénégal ?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-10">
                Vérifiez dès maintenant les conditions d'accès correspondant à votre situation.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/#recherche">
                  Vérifier mes conditions
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

export default About;
