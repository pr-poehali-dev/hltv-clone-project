import Header from "@/components/Header";
import TeamRankingCard from "@/components/TeamRankingCard";
import { mockTeams } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Trophy, Users } from "lucide-react";

const RankingsPage = () => {
  const sortedTeams = [...mockTeams].sort((a, b) => a.ranking - b.ranking);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald">Рейтинги</h1>
          <Badge variant="outline">Обновлено сегодня</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Team Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Рейтинг команд epic league
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedTeams.map((team, index) => (
                  <TeamRankingCard
                    key={team.id}
                    team={team}
                    previousRanking={
                      team.ranking + Math.floor(Math.random() * 3) - 1
                    }
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Recent Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Изменения
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={mockTeams[0].logo}
                      alt={mockTeams[0].name}
                      className="w-8 h-8 rounded"
                    />
                    <span className="font-medium">{mockTeams[0].name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-bold">+2</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={mockTeams[1].logo}
                      alt={mockTeams[1].name}
                      className="w-8 h-8 rounded"
                    />
                    <span className="font-medium">{mockTeams[1].name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <TrendingUp className="w-4 h-4 rotate-180" />
                    <span className="text-sm font-bold">-1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Статистика
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Всего команд
                  </span>
                  <span className="font-bold">{mockTeams.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Топ-10 команд
                  </span>
                  <span className="font-bold">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Изменений за неделю
                  </span>
                  <span className="font-bold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Новых команд
                  </span>
                  <span className="font-bold">3</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Players */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Топ игроки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTeams.slice(0, 3).map((team, index) =>
                  team.players.slice(0, 1).map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary">
                          #{index + 1}
                        </span>
                        <div>
                          <div className="font-medium">{player.nickname}</div>
                          <div className="text-xs text-muted-foreground">
                            {team.name}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-primary">
                        {player.rating.toFixed(2)}
                      </span>
                    </div>
                  )),
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RankingsPage;
