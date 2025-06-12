export interface Team {
  id: string;
  name: string;
  logo: string;
  country: string;
  ranking: number;
  players: Player[];
}

export interface Player {
  id: string;
  nickname: string;
  realName: string;
  country: string;
  team: string;
  rating: number;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  status: MatchStatus;
  score: {
    team1: number;
    team2: number;
  };
  startTime: Date;
  event: string;
  format: string; // BO1, BO3, BO5
  maps: string[];
  isLive: boolean;
  isFeatured: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  publishDate: Date;
  category: NewsCategory;
  tags: string[];
  readTime: number;
}

export interface Event {
  id: string;
  name: string;
  logo: string;
  startDate: Date;
  endDate: Date;
  location: string;
  prizePool: string;
  teams: Team[];
}

export type MatchStatus = "live" | "upcoming" | "finished";
export type NewsCategory =
  | "breaking"
  | "transfers"
  | "interviews"
  | "analysis"
  | "results";
export type Region =
  | "europe"
  | "north-america"
  | "asia"
  | "oceania"
  | "south-america";

export interface Notification {
  id: string;
  type: "match" | "news" | "transfer" | "achievement";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  icon?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  favoriteTeams: string[];
  notifications: boolean;
  darkMode: boolean;
  language: "ru" | "en";
  joinDate: Date;
}

export interface SearchResult {
  id: string;
  type: "team" | "player" | "match" | "news" | "event";
  title: string;
  subtitle?: string;
  image?: string;
  url: string;
}
