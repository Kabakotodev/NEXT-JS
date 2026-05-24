import { Link } from "react-router-dom";
import { getRecentArticles } from "@/data/articles";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RecentArticles = () => {
  const articles = getRecentArticles(5);
  const [featured, ...rest] = articles;

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Dernières Actualités
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Les informations les plus récentes sur l'immigration au Sénégal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Featured article */}
          <article className="group rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6 flex flex-col gap-3">
              <Badge variant="secondary" className="w-fit text-xs">
                {featured.category}
              </Badge>
              <h3 className="font-display text-xl font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {featured.title}
              </h3>
              <p className="text-sm text-muted-foreground">{featured.summary}</p>
              <span className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(featured.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </article>

          {/* Side list */}
          <div className="flex flex-col gap-4">
            {rest.map((article) => (
              <article
                key={article.id}
                className="group flex gap-4 rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-28 h-20 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex flex-col justify-center gap-1 min-w-0">
                  <Badge variant="outline" className="w-fit text-[10px]">
                    {article.category}
                  </Badge>
                  <h4 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/actualites">
              Toutes les actualités
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
