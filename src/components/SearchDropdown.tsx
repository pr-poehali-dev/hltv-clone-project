import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockTeams, mockMatches, mockNews, mockEvents } from "@/data/mockData";
import { SearchResult } from "@/types";

interface SearchDropdownProps {
  onResultClick?: (result: SearchResult) => void;
}

const SearchDropdown = ({ onResultClick }: SearchDropdownProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults: SearchResult[] = [];

    // Search teams
    mockTeams.forEach((team) => {
      if (team.name.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          id: team.id,
          type: "team",
          title: team.name,
          subtitle: `#${team.ranking} в рейтинге`,
          image: team.logo,
          url: `/teams/${team.id}`,
        });
      }
    });

    // Search players
    mockTeams.forEach((team) => {
      team.players.forEach((player) => {
        if (
          player.nickname.toLowerCase().includes(query.toLowerCase()) ||
          player.realName.toLowerCase().includes(query.toLowerCase())
        ) {
          searchResults.push({
            id: player.id,
            type: "player",
            title: player.nickname,
            subtitle: `${player.realName} (${team.name})`,
            url: `/players/${player.id}`,
          });
        }
      });
    });

    // Search matches
    mockMatches.forEach((match) => {
      const matchString = `${match.team1.name} vs ${match.team2.name}`;
      if (
        matchString.toLowerCase().includes(query.toLowerCase()) ||
        match.event.toLowerCase().includes(query.toLowerCase())
      ) {
        searchResults.push({
          id: match.id,
          type: "match",
          title: `${match.team1.name} vs ${match.team2.name}`,
          subtitle: match.event,
          url: `/matches/${match.id}`,
        });
      }
    });

    // Search news
    mockNews.forEach((article) => {
      if (
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase())
      ) {
        searchResults.push({
          id: article.id,
          type: "news",
          title: article.title,
          subtitle: article.author,
          image: article.thumbnail,
          url: `/news/${article.id}`,
        });
      }
    });

    // Search events
    mockEvents.forEach((event) => {
      if (
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
      ) {
        searchResults.push({
          id: event.id,
          type: "event",
          title: event.name,
          subtitle: event.location,
          image: event.logo,
          url: `/events/${event.id}`,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
    setIsOpen(true);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "team":
        return "👥";
      case "player":
        return "🎮";
      case "match":
        return "⚔️";
      case "news":
        return "📰";
      case "event":
        return "🏆";
      default:
        return "🔍";
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    onResultClick?.(result);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="search"
          placeholder="Поиск команд, игроков, матчей..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-10 w-64 bg-muted/50 border-muted"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
            >
              {result.image ? (
                <img
                  src={result.image}
                  alt=""
                  className="w-8 h-8 rounded object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center text-sm">
                  {getTypeIcon(result.type)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {result.title}
                </div>
                {result.subtitle && (
                  <div className="text-xs text-muted-foreground truncate">
                    {result.subtitle}
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {result.type}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
