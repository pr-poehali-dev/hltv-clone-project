import Header from "@/components/Header";
import { mockTeams, mockMatches, mockNews } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Trophy,
  Users,
  Target,
  Zap,
} from "lucide-react";

const StatisticsPage = () => {
  const liveMatches = mockMatches.filter((match) => match.isLive);
  const finishedMatches = mockMatches.filter(
    (match) => match.status === "finished",
  );
  const upcomingMatches = mockMatches.filter(
    (match) => match.status === "upcoming",
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald">Статистика</h1>
          <Badge variant="outline">Обновлено в реальном времени</Badge>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live матчи</p>
                  <p className="text-2xl font-bold text-red-500">
                    {liveMatches.length}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Команды</p>
                  <p className="text-2xl font-bold text-primary">
                    {mockTeams.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Матчи сегодня</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {mockMatches.length}
                  </p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Новостей</p>
                  <p className="text-2xl font-bold text-green-500">
                    {mockNews.length}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Match Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Статистика матчей
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Live матчи
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500"
                      style={{
                        width: `${(liveMatches.length / mockMatches.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-bold text-red-500">
                    {liveMatches.length}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Предстоящие
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${(upcomingMatches.length / mockMatches.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-bold text-blue-500">
                    {upcomingMatches.length}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Завершенные
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${(finishedMatches.length / mockMatches.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-bold text-green-500">
                    {finishedMatches.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Players Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Топ игроки по рейтингу
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTeams.slice(0, 5).map((team, index) =>
                team.players.slice(0, 1).map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-bold ${
                          index === 0
                            ? "text-yellow-500"
                            : index === 1
                              ? "text-gray-400"
                              : index === 2
                                ? "text-orange-600"
                                : "text-primary"
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <div>
                        <div className="font-medium">{player.nickname}</div>
                        <div className="text-xs text-muted-foreground">
                          {team.name} • {player.country}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        {player.rating.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        рейтинг
                      </div>
                    </div>
                  </div>
                )),
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
