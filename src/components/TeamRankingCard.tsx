import { Team } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TeamRankingCardProps {
  team: Team;
  previousRanking?: number;
}

const TeamRankingCard = ({ team, previousRanking }: TeamRankingCardProps) => {
  const getRankingChange = () => {
    if (!previousRanking) return null;
    const change = previousRanking - team.ranking;
    if (change > 0) return { type: "up", value: change };
    if (change < 0) return { type: "down", value: Math.abs(change) };
    return { type: "same", value: 0 };
  };

  const rankingChange = getRankingChange();

  const getRankingIcon = () => {
    if (!rankingChange) return null;
    switch (rankingChange.type) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "same":
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRankingColor = (ranking: number) => {
    if (ranking <= 5) return "text-primary";
    if (ranking <= 10) return "text-orange-500";
    if (ranking <= 20) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <Card className="hover:bg-card/80 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            className={`text-2xl font-bold font-oswald ${getRankingColor(team.ranking)}`}
          >
            #{team.ranking}
          </div>

          <img
            src={team.logo}
            alt={team.name}
            className="w-12 h-12 rounded object-cover"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{team.name}</h3>
              <span className="text-xs text-muted-foreground uppercase">
                {team.country}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {team.players.length} игроков
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getRankingIcon()}
            {rankingChange && rankingChange.value > 0 && (
              <span
                className={`text-sm font-medium ${
                  rankingChange.type === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {rankingChange.value}
              </span>
            )}
          </div>
        </div>

        {team.players.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Топ игрок:</span>
              <span className="font-medium text-foreground">
                {team.players[0]?.nickname} (
                {team.players[0]?.rating.toFixed(2)})
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamRankingCard;
