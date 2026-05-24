import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const categorieInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Place de l'Indépendance, Dakar, Sénégal",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+221 33 XXX XX XX",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@immigration.sn",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun - Ven : 8h00 - 17h00",
  },
];

const Categorie = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Hero Section */}
        
        {/* Contact Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-1">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Informations de contact
                  </h2>
                  <div className="space-y-6">
                    {categorieInfo.map((info) => (
                      <div key={info.title} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">
                            {info.title}
                          </p>
                          <p className="text-muted-foreground">{info.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="card-elevated p-6 lg:p-10">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                      Ajouter une nouvelle catégorie
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Remplissez les informations de la nouvelle catégorie dans le formulaire ci-dessous.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Nom *
                        </label>
                        <Input
                          required
                          placeholder="saisissez le nom de la catégorie..."
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Description *
                        </label>
                        <Textarea
                          required
                          placeholder="Saisissez la description de la catégorie..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          rows={6}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Valider la catégorie 
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Categorie;
