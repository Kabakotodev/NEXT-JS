import { Link } from "react-router-dom";
import { getArticlesSorted } from "@/data/articles";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NewsTimeline = () => {
  const articles = getArticlesSorted();

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Fil d'Actualités
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Parcourez toutes nos actualités par ordre chronologique
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-px" />

          {articles.map((article, index) => {
            const isLeft = index % 2 === 0;
            return (
              <Link
                to={`/actualites/${article.id}`}
                key={article.id}
                className="group relative flex items-start mb-10 last:mb-0"
              >
                {/* Dot */}
                <div className="absolute left-5 lg:left-1/2 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-md -translate-x-1/2 mt-1.5 z-10 group-hover:scale-125 transition-transform" />

                {/* Card - mobile always right, desktop alternating */}
                <div
                  className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                    isLeft ? "lg:mr-auto lg:pr-0" : "lg:ml-auto lg:pl-0"
                  }`}
                >
                  <div className="rounded-lg border border-border bg-card p-4 shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px]">
                        {article.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsTimeline;
