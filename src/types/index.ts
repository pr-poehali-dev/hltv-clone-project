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
