import { Event } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard = ({ event, featured = false }: EventCardProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const isOngoing =
    new Date() >= event.startDate && new Date() <= event.endDate;
  const isUpcoming = new Date() < event.startDate;

  return (
    <Card
      className={`overflow-hidden hover:bg-card/80 transition-all duration-300 cursor-pointer group ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="relative">
        <img
          src={event.logo}
          alt={event.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? "h-48 md:h-64" : "h-32"
          }`}
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`${
              isOngoing
                ? "bg-red-600 hover:bg-red-700"
                : isUpcoming
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 hover:bg-gray-700"
            } text-white`}
          >
            {isOngoing ? "Live" : isUpcoming ? "Скоро" : "Завершен"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3
          className={`font-bold font-oswald leading-tight mb-3 group-hover:text-primary transition-colors ${
            featured ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {event.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="font-bold text-primary">{event.prizePool}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{event.teams.length} команд</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Расписание
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Результаты
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
