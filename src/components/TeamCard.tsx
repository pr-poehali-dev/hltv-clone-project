import { Team } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Trophy, TrendingUp } from "lucide-react";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const getRankingColor = (ranking: number) => {
    if (ranking <= 5) return "text-primary";
    if (ranking <= 10) return "text-orange-500";
    if (ranking <= 20) return "text-yellow-500";
    return "text-muted-foreground";
  };

  return (
    <Card className="hover:bg-card/80 transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`text-2xl font-bold font-oswald ${getRankingColor(team.ranking)}`}
          >
            #{team.ranking}
          </div>
          <img
            src={team.logo}
            alt={team.name}
            className="w-16 h-16 rounded object-cover"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold font-oswald mb-2 group-hover:text-primary transition-colors">
            {team.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {team.country}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {team.players.length}
            </Badge>
          </div>
        </div>

        {team.players.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Топ игрок:
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-medium">{team.players[0].nickname}</span>
              <span className="text-sm text-primary font-bold">
                {team.players[0].rating.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Trophy className="w-4 h-4 mr-2" />
            Статистика
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            Матчи
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
