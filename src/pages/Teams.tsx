import { useState } from "react";
import Header from "@/components/Header";
import TeamCard from "@/components/TeamCard";
import { mockTeams } from "@/data/mockData";
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
import { Search, Filter, Users, Trophy } from "lucide-react";

const TeamsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("ranking");

  const filteredTeams = mockTeams
    .filter((team) => {
      const matchesSearch =
        searchTerm === "" ||
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.players.some((player) =>
          player.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "ranking") {
        return a.ranking - b.ranking;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald">Команды</h1>
          <Badge variant="outline">{filteredTeams.length} команд</Badge>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск команд или игроков..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Регион" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все регионы</SelectItem>
                <SelectItem value="eu">Европа</SelectItem>
                <SelectItem value="na">Северная Америка</SelectItem>
                <SelectItem value="asia">Азия</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">По рейтингу</SelectItem>
                <SelectItem value="name">По названию</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Top Teams */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Топ команды
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeams.slice(0, 8).map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>

        {/* All Teams */}
        {filteredTeams.length > 8 && (
          <section>
            <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Все команды
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTeams.slice(8).map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
        )}

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Команды не найдены</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamsPage;
