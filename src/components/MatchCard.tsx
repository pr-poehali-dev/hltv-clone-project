import { Match } from "@/types";
import { Clock, MapPin, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MatchCardProps {
  match: Match;
  compact?: boolean;
}

const MatchCard = ({ match, compact = false }: MatchCardProps) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-live-red text-white";
      case "upcoming":
        return "bg-blue-600 text-white";
      case "finished":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE";
      case "upcoming":
        return "Скоро";
      case "finished":
        return "Завершен";
      default:
        return status;
    }
  };

  return (
    <Card
      className={`hover:bg-card/80 transition-colors cursor-pointer ${match.isFeatured ? "border-primary" : ""}`}
    >
      <CardContent className={`p-4 ${compact ? "py-3" : ""}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(match.status)} text-xs`}>
              {match.isLive && <span className="live-indicator mr-1" />}
              {getStatusText(match.status)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {match.format}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {match.status === "upcoming"
              ? formatTime(match.startTime)
              : formatDate(match.startTime)}
          </div>
        </div>

        <div className="grid grid-cols-5 items-center gap-4">
          {/* Team 1 */}
          <div className="col-span-2 flex items-center gap-3">
            <img
              src={match.team1.logo}
              alt={match.team1.name}
              className="w-8 h-8 rounded object-cover"
            />
            <div>
              <div className="font-medium text-sm">{match.team1.name}</div>
              <div className="text-xs text-muted-foreground">
                #{match.team1.ranking}
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="col-span-1 text-center">
            {match.status === "live" || match.status === "finished" ? (
              <div className="text-lg font-bold font-oswald">
                {match.score.team1} : {match.score.team2}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">vs</div>
            )}
          </div>

          {/* Team 2 */}
          <div className="col-span-2 flex items-center justify-end gap-3">
            <div className="text-right">
              <div className="font-medium text-sm">{match.team2.name}</div>
              <div className="text-xs text-muted-foreground">
                #{match.team2.ranking}
              </div>
            </div>
            <img
              src={match.team2.logo}
              alt={match.team2.name}
              className="w-8 h-8 rounded object-cover"
            />
          </div>
        </div>

        {!compact && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>{match.event}</span>
              </div>
              {match.maps.length > 0 && match.maps[0] !== "TBA" && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{match.maps.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;
