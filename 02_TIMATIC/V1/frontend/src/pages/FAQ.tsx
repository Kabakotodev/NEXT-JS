import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";

const faqCategories = [
  {
    title: "Conditions d'entrée",
    questions: [
      {
        question: "Ai-je besoin d'un visa pour entrer au Sénégal ?",
        answer: "Cela dépend de votre nationalité et de votre type de document de voyage. Utilisez notre moteur de recherche sur la page d'accueil pour vérifier les conditions spécifiques à votre situation. De manière générale, les ressortissants de nombreux pays africains et de l'espace CEDEAO sont exemptés de visa pour les séjours touristiques.",
      },
      {
        question: "Quelle est la durée maximale de séjour autorisée ?",
        answer: "La durée maximale de séjour varie selon votre nationalité et le type de visa. Pour les séjours touristiques sans visa, la durée est généralement de 90 jours. Pour les visas de court séjour, elle peut aller jusqu'à 30 ou 90 jours selon les accords bilatéraux.",
      },
      {
        question: "Quels documents dois-je présenter à l'entrée ?",
        answer: "Vous devez généralement présenter un passeport valide au moins 6 mois après votre date d'entrée, un visa si requis, un billet de retour ou de continuation, et une preuve d'hébergement. Des documents supplémentaires peuvent être demandés selon votre situation.",
      },
    ],
  },
  {
    title: "Procédures de visa",
    questions: [
      {
        question: "Comment obtenir un visa pour le Sénégal ?",
        answer: "Les demandes de visa doivent être déposées auprès de l'ambassade ou du consulat du Sénégal dans votre pays de résidence. Vous pouvez également vérifier si un visa électronique est disponible pour votre nationalité. Les délais de traitement varient généralement de 5 à 15 jours ouvrables.",
      },
      {
        question: "Puis-je prolonger mon séjour une fois au Sénégal ?",
        answer: "Oui, il est possible de demander une prolongation de séjour auprès de la Direction de la Police des Étrangers et des Titres de Voyage à Dakar. La demande doit être faite avant l'expiration de votre visa ou autorisation de séjour actuelle.",
      },
      {
        question: "Quels sont les frais de visa ?",
        answer: "Les frais de visa varient selon le type de visa et votre nationalité. Contactez l'ambassade ou le consulat du Sénégal dans votre pays pour obtenir les tarifs en vigueur. Ces frais sont généralement payables au moment du dépôt de la demande.",
      },
    ],
  },
  {
    title: "Informations pratiques",
    questions: [
      {
        question: "Les informations sur ce site sont-elles officielles ?",
        answer: "Oui, toutes les informations présentées sur ce portail sont vérifiées et validées par les autorités compétentes sénégalaises. Cependant, nous vous recommandons de confirmer les conditions d'entrée auprès de l'ambassade du Sénégal avant votre voyage, car les réglementations peuvent évoluer.",
      },
      {
        question: "Que faire si ma nationalité n'apparaît pas dans la liste ?",
        answer: "Si votre pays n'apparaît pas dans notre liste déroulante, veuillez nous contacter via le formulaire de contact. Notre équipe vous répondra dans les plus brefs délais avec les informations correspondant à votre situation.",
      },
      {
        question: "Comment contacter l'ambassade du Sénégal ?",
        answer: "Vous pouvez trouver les coordonnées de l'ambassade du Sénégal dans votre pays en consultant le site du Ministère des Affaires Étrangères du Sénégal ou en effectuant une recherche pour 'Ambassade du Sénégal' suivi du nom de votre pays.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="bg-institutional text-primary-foreground py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                Questions fréquentes
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Trouvez rapidement des réponses aux questions les plus courantes concernant les conditions d'entrée au Sénégal.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={category.title} className="mb-12">
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${categoryIndex}-${index}`}
                        className="card-institutional px-6 data-[state=open]:shadow-md transition-shadow"
                      >
                        <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Vous n'avez pas trouvé votre réponse ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe est disponible pour répondre à toutes vos questions spécifiques.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Nous contacter
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

export default FAQ;
