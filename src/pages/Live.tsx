import { useState } from "react";
import Header from "@/components/Header";
import MatchCard from "@/components/MatchCard";
import { mockMatches } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Users, MessageCircle, Eye, Zap, Radio } from "lucide-react";

const LivePage = () => {
  const [selectedMatch, setSelectedMatch] = useState(
    mockMatches.find((m) => m.isLive),
  );
  const liveMatches = mockMatches.filter((match) => match.isLive);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            Live трансляции
          </h1>
          <Badge variant="destructive" className="animate-pulse">
            {liveMatches.length} Live
          </Badge>
        </div>

        {liveMatches.length === 0 ? (
          <div className="text-center py-16">
            <Radio className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-2">
              Нет активных трансляций
            </p>
            <p className="text-muted-foreground">
              Следите за расписанием матчей
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Stream */}
            <div className="lg:col-span-3">
              {selectedMatch && (
                <Card className="mb-6">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-900 relative rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">
                            {selectedMatch.team1.name} vs{" "}
                            {selectedMatch.team2.name}
                          </p>
                          <p className="text-sm opacity-75">
                            {selectedMatch.event}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white animate-pulse">
                          <Zap className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary">
                          <Eye className="w-3 h-3 mr-1" />
                          42,5K
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button className="bg-red-600 hover:bg-red-700">
                            <Play className="w-4 h-4 mr-2" />
                            Смотреть на Twitch
                          </Button>
                          <Button variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Чат
                          </Button>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold font-oswald">
                            {selectedMatch.score.team1} :{" "}
                            {selectedMatch.score.team2}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {selectedMatch.format}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Match Details */}
              {selectedMatch && (
                <Card>
                  <CardHeader>
                    <CardTitle>Детали матча</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <img
                          src={selectedMatch.team1.logo}
                          alt={selectedMatch.team1.name}
                          className="w-24 h-24 mx-auto mb-4 rounded"
                        />
                        <h3 className="text-xl font-bold font-oswald">
                          {selectedMatch.team1.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Рейтинг #{selectedMatch.team1.ranking}
                        </p>
                      </div>

                      <div className="text-center">
                        <img
                          src={selectedMatch.team2.logo}
                          alt={selectedMatch.team2.name}
                          className="w-24 h-24 mx-auto mb-4 rounded"
                        />
                        <h3 className="text-xl font-bold font-oswald">
                          {selectedMatch.team2.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Рейтинг #{selectedMatch.team2.ranking}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Live Matches Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-red-500" />
                    Live матчи
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liveMatches.map((match) => (
                    <div
                      key={match.id}
                      className={`cursor-pointer transition-colors rounded-lg ${
                        selectedMatch?.id === match.id
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedMatch(match)}
                    >
                      <MatchCard match={match} compact />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Stream Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Статистика стримов
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Всего зрителей
                    </span>
                    <span className="font-bold">156,8K</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Активных стримов
                    </span>
                    <span className="font-bold">{liveMatches.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Пик зрителей
                    </span>
                    <span className="font-bold">289,3K</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LivePage;
