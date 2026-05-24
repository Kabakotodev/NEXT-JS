import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ARTICLES } from "@/data/articles";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = ARTICLES.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 lg:pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">Article introuvable</h1>
            <Button asChild>
              <Link to="/actualites"><ArrowLeft className="w-4 h-4 mr-2" />Retour aux actualités</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link to="/actualites"><ArrowLeft className="w-4 h-4 mr-1" />Retour aux actualités</Link>
          </Button>

          <Badge variant="secondary" className="mb-4">
            <Tag className="w-3 h-3 mr-1" />
            {article.category}
          </Badge>

          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {article.author}
            </span>
          </div>

          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <p className="text-lg text-muted-foreground mb-6 font-medium">{article.summary}</p>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>{article.content}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
