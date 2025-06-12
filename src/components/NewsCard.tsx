import { NewsArticle } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const NewsCard = ({ article, featured = false }: NewsCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breaking":
        return "bg-red-600 hover:bg-red-700";
      case "transfers":
        return "bg-blue-600 hover:bg-blue-700";
      case "interviews":
        return "bg-green-600 hover:bg-green-700";
      case "analysis":
        return "bg-purple-600 hover:bg-purple-700";
      case "results":
        return "bg-orange-600 hover:bg-orange-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "breaking":
        return "Срочно";
      case "transfers":
        return "Трансферы";
      case "interviews":
        return "Интервью";
      case "analysis":
        return "Аналитика";
      case "results":
        return "Результаты";
      default:
        return category;
    }
  };

  return (
    <Card
      className={`overflow-hidden hover:bg-card/80 transition-all duration-300 cursor-pointer group ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative">
        <img
          src={article.thumbnail}
          alt={article.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? "h-48 md:h-64" : "h-32"
          }`}
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`${getCategoryColor(article.category)} text-white text-xs`}
          >
            {getCategoryText(article.category)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3
          className={`font-semibold leading-tight mb-2 group-hover:text-primary transition-colors ${
            featured ? "text-lg md:text-xl" : "text-sm"
          }`}
        >
          {article.title}
        </h3>

        <p
          className={`text-muted-foreground mb-3 ${
            featured ? "text-sm md:text-base" : "text-xs"
          }`}
        >
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{article.readTime} мин</span>
            </div>
          </div>
          <span>{formatDate(article.publishDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
