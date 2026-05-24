import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getArticlesSorted } from "@/data/articles";
import { Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Actualites = () => {
  const articles = getArticlesSorted();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        {/* Hero */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Actualités
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Suivez les dernières informations sur l'immigration et les conditions d'accès au Sénégal
            </p>
          </div>
        </section>

        {/* Articles grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link to={`/actualites/${article.id}`} key={article.id} className="group">
                  <article className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-medium">
                          <Tag className="w-3 h-3 mr-1" />
                          {article.category}
                        </Badge>
                      </div>
                      <h2 className="font-display text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {article.author}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Actualites;
