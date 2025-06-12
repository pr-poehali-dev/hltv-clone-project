import { useState } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import { mockNews } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock } from "lucide-react";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredNews = mockNews
    .filter((article) => {
      const matchesSearch =
        searchTerm === "" ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return b.publishDate.getTime() - a.publishDate.getTime();
      }
      if (sortBy === "oldest") {
        return a.publishDate.getTime() - b.publishDate.getTime();
      }
      if (sortBy === "readTime") {
        return a.readTime - b.readTime;
      }
      return 0;
    });

  const categories = [
    { value: "breaking", label: "Срочно" },
    { value: "transfers", label: "Трансферы" },
    { value: "interviews", label: "Интервью" },
    { value: "analysis", label: "Аналитика" },
    { value: "results", label: "Результаты" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald">Новости</h1>
          <Badge variant="outline">{filteredNews.length} статей</Badge>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск новостей..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Сначала новые</SelectItem>
                <SelectItem value="oldest">Сначала старые</SelectItem>
                <SelectItem value="readTime">По времени чтения</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Featured Article */}
        {filteredNews.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-oswald mb-4">
              Главная новость
            </h2>
            <NewsCard article={filteredNews[0]} featured />
          </section>
        )}

        {/* Latest News */}
        {filteredNews.length > 1 && (
          <section>
            <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Последние новости
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.slice(1).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Новости не найдены</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsPage;
