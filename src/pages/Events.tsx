import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Trophy, DollarSign } from "lucide-react";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold font-oswald">События</h1>
          <Badge variant="outline">{mockEvents.length} активных</Badge>
        </div>

        {/* Featured Event */}
        {mockEvents.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Главное событие
            </h2>
            <EventCard event={mockEvents[0]} featured />
          </section>
        )}

        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-bold font-oswald mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Предстоящие события
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventsPage;
