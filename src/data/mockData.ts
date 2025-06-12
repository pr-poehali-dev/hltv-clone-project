import { Team, Match, NewsArticle, Event } from "@/types";

export const mockTeams: Team[] = [
  {
    id: "1",
    name: "NAVI",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
    country: "UA",
    ranking: 1,
    players: [
      {
        id: "1",
        nickname: "s1mple",
        realName: "Oleksandr Kostyliev",
        country: "UA",
        team: "NAVI",
        rating: 1.31,
      },
      {
        id: "2",
        nickname: "electronic",
        realName: "Denis Sharipov",
        country: "RU",
        team: "NAVI",
        rating: 1.18,
      },
      {
        id: "3",
        nickname: "Perfecto",
        realName: "Ilya Zalutskiy",
        country: "RU",
        team: "NAVI",
        rating: 1.05,
      },
    ],
  },
  {
    id: "2",
    name: "FaZe",
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
    country: "EU",
    ranking: 2,
    players: [
      {
        id: "4",
        nickname: "karrigan",
        realName: "Finn Andersen",
        country: "DK",
        team: "FaZe",
        rating: 1.12,
      },
      {
        id: "5",
        nickname: "rain",
        realName: "Håvard Nygaard",
        country: "NO",
        team: "FaZe",
        rating: 1.15,
      },
    ],
  },
  {
    id: "3",
    name: "Astralis",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    country: "DK",
    ranking: 3,
    players: [],
  },
  {
    id: "4",
    name: "G2",
    logo: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop",
    country: "EU",
    ranking: 4,
    players: [],
  },
];

export const mockMatches: Match[] = [
  {
    id: "1",
    team1: mockTeams[0],
    team2: mockTeams[1],
    status: "live",
    score: { team1: 13, team2: 8 },
    startTime: new Date(),
    event: "IEM Katowice 2024",
    format: "BO3",
    maps: ["Mirage", "Inferno", "Dust2"],
    isLive: true,
    isFeatured: true,
  },
  {
    id: "2",
    team1: mockTeams[2],
    team2: mockTeams[3],
    status: "upcoming",
    score: { team1: 0, team2: 0 },
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    event: "ESL Pro League",
    format: "BO1",
    maps: ["TBA"],
    isLive: false,
    isFeatured: false,
  },
  {
    id: "3",
    team1: mockTeams[0],
    team2: mockTeams[2],
    status: "finished",
    score: { team1: 16, team2: 14 },
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    event: "BLAST Premier",
    format: "BO1",
    maps: ["Inferno"],
    isLive: false,
    isFeatured: false,
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    title: "NAVI побеждает FaZe в финале IEM Katowice",
    excerpt:
      "Невероятная игра s1mple приводит NAVI к победе в драматичном финале против FaZe Clan...",
    content: "Полный текст статьи...",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    author: "Иван Петров",
    publishDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "results",
    tags: ["NAVI", "FaZe", "IEM Katowice"],
    readTime: 5,
  },
  {
    id: "2",
    title: "Новый трансфер: ZywOo переходит в G2",
    excerpt:
      "Французский снайпер официально присоединяется к G2 Esports после долгих переговоров...",
    content: "Полный текст статьи...",
    thumbnail:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
    author: "Мария Сидорова",
    publishDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
    category: "transfers",
    tags: ["ZywOo", "G2", "трансферы"],
    readTime: 3,
  },
  {
    id: "3",
    title: "Интервью с karrigan о тактике FaZe",
    excerpt:
      "Капитан FaZe рассказывает о новых стратегиях команды и подготовке к предстоящим турнирам...",
    content: "Полный текст статьи...",
    thumbnail:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    author: "Александр Козлов",
    publishDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    category: "interviews",
    tags: ["karrigan", "FaZe", "интервью"],
    readTime: 8,
  },
];

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "IEM Katowice 2024",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    location: "Katowice, Poland",
    prizePool: "$1,000,000",
    teams: mockTeams,
  },
];
