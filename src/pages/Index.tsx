import Header from "@/components/Header";
import MatchCard from "@/components/MatchCard";
import NewsCard from "@/components/NewsCard";
import TeamRankingCard from "@/components/TeamRankingCard";
import { mockMatches, mockNews, mockTeams } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  ArrowRight,
  Calendar,
  Trophy,
  Users,
  BarChart3,
} from "lucide-react";

const Index = () => {
  const featuredMatch = mockMatches.find((match) => match.isFeatured);
  const liveMatches = mockMatches.filter((match) => match.isLive);
  const upcomingMatches = mockMatches.filter(
    (match) => match.status === "upcoming",
  );
  const latestNews = mockNews.slice(0, 4);
  const topTeams = mockTeams.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Featured Match */}
        {featuredMatch && (
          <section className="mb-12">
            <Card className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-live-red text-white animate-pulse-live">
                    <Play className="w-3 h-3 mr-1" />
                    LIVE MATCH
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {featuredMatch.event}
                  </span>
                </div>

                <div className="grid md:grid-cols-5 items-center gap-6 mb-6">
                  <div className="md:col-span-2 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                      <img
                        src={featuredMatch.team1.logo}
                        alt={featuredMatch.team1.name}
                        className="w-16 h-16 rounded"
                      />
                      <div>
                        <h2 className="text-2xl font-bold font-oswald">
                          {featuredMatch.team1.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Рейтинг #{featuredMatch.team1.ranking}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 text-center">
                    <div className="text-4xl font-bold font-oswald text-primary mb-2">
                      {featuredMatch.score.team1} : {featuredMatch.score.team2}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {featuredMatch.format}
                    </div>
                  </div>

                  <div className="md:col-span-2 text-center md:text-right">
                    <div className="flex items-center justify-center md:justify-end gap-4 mb-2">
                      <div>
                        <h2 className="text-2xl font-bold font-oswald">
                          {featuredMatch.team2.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Рейтинг #{featuredMatch.team2.ranking}
                        </p>
                      </div>
                      <img
                        src={featuredMatch.team2.logo}
                        alt={featuredMatch.team2.name}
                        className="w-16 h-16 rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Play className="w-4 h-4 mr-2" />
                    Смотреть Live
                  </Button>
                  <Button variant="outline">Детали матча</Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Live & Upcoming Matches */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-oswald flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Матчи
                </h2>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80"
                >
                  Все матчи <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
                {upcomingMatches.slice(0, 3).map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-oswald flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-primary" />
                  Последние новости
                </h2>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80"
                >
                  Все новости <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {latestNews.map((article, index) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    featured={index === 0}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Team Rankings */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Топ команды
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topTeams.map((team) => (
                    <TeamRankingCard key={team.id} team={team} />
                  ))}
                  <Button variant="outline" className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Полный рейтинг
                  </Button>
                </CardContent>
              </Card>
            </section>

            {/* Quick Stats */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Live матчей
                    </span>
                    <span className="font-bold text-live-red">
                      {liveMatches.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Матчей сегодня
                    </span>
                    <span className="font-bold">{mockMatches.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Активных команд
                    </span>
                    <span className="font-bold">{mockTeams.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Новых статей
                    </span>
                    <span className="font-bold">{mockNews.length}</span>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
