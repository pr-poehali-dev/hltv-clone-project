import { useState } from "react";
import Header from "@/components/Header";
import MatchCard from "@/components/MatchCard";
import { mockMatches } from "@/data/mockData";
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
import { Calendar, Filter, Search } from "lucide-react";

const MatchesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch =
      searchTerm === "" ||
      match.team1.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.team2.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.event.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || match.status === statusFilter;
    const matchesEvent = eventFilter === "all" || match.event === eventFilter;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  const liveMatches = filteredMatches.filter((match) => match.isLive);
  const upcomingMatches = filteredMatches.filter(
    (match) => match.status === "upcoming",
  );
  const finishedMatches = filteredMatches.filter(
    (match) => match.status === "finished",
  );

  const events = [...new Set(mockMatches.map((match) => match.event))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald">Матчи</h1>
          <div className="flex items-center gap-2">
            <Badge variant="destructive" className="animate-pulse">
              {liveMatches.length} Live
            </Badge>
            <Badge variant="outline">
              {upcomingMatches.length} предстоящих
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск команд или турниров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все матчи</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="upcoming">Предстоящие</SelectItem>
                <SelectItem value="finished">Завершенные</SelectItem>
              </SelectContent>
            </Select>

            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Турнир" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все турниры</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event} value={event}>
                    {event}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              Live матчи
            </h2>
            <div className="grid gap-4">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Предстоящие матчи
            </h2>
            <div className="grid gap-4">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Finished Matches */}
        {finishedMatches.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-oswald mb-4">
              Завершенные матчи
            </h2>
            <div className="grid gap-4">
              {finishedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Матчи не найдены</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MatchesPage;
