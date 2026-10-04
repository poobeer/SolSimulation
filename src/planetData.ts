export interface Planet {
  name: string;
  color: string;
  glowColor: string;
  radius: number; // display radius in px
  orbitRadius: number; // display orbit radius in px
  realDiameter: string; // km
  realDistance: string; // million km from Sun
  orbitalPeriod: string;
  orbitalPeriodDays: number; // for animation speed
  description: string;
  emoji: string;
}

export const planets: Planet[] = [
  {
    name: "Mercury",
    color: "#b5b5b5",
    glowColor: "#8a8a8a",
    radius: 4,
    orbitRadius: 60,
    realDiameter: "4,879 km",
    realDistance: "57.9 million km",
    orbitalPeriod: "88 days",
    orbitalPeriodDays: 88,
    description: "The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.",
    emoji: "☿",
  },
  {
    name: "Venus",
    color: "#e8cda0",
    glowColor: "#d4a853",
    radius: 7,
    orbitRadius: 95,
    realDiameter: "12,104 km",
    realDistance: "108.2 million km",
    orbitalPeriod: "225 days",
    orbitalPeriodDays: 225,
    description: "The hottest planet with a thick toxic atmosphere. It rotates backwards compared to most planets.",
    emoji: "♀",
  },
  {
    name: "Earth",
    color: "#4da6ff",
    glowColor: "#2979cc",
    radius: 8,
    orbitRadius: 135,
    realDiameter: "12,756 km",
    realDistance: "149.6 million km",
    orbitalPeriod: "365.25 days",
    orbitalPeriodDays: 365,
    description: "Our home planet — the only known world with liquid water on its surface and life.",
    emoji: "🌍",
  },
  {
    name: "Mars",
    color: "#e07050",
    glowColor: "#c0442a",
    radius: 6,
    orbitRadius: 175,
    realDiameter: "6,792 km",
    realDistance: "227.9 million km",
    orbitalPeriod: "687 days",
    orbitalPeriodDays: 687,
    description: "The Red Planet, named after the Roman god of war. It has the largest volcano in the solar system.",
    emoji: "♂",
  },
  {
    name: "Jupiter",
    color: "#d4a574",
    glowColor: "#b87a42",
    radius: 18,
    orbitRadius: 240,
    realDiameter: "142,984 km",
    realDistance: "778.6 million km",
    orbitalPeriod: "11.86 years",
    orbitalPeriodDays: 4333,
    description: "The largest planet — a gas giant with a Great Red Spot storm that has raged for centuries.",
    emoji: "♃",
  },
  {
    name: "Saturn",
    color: "#e8d5a3",
    glowColor: "#c4a85c",
    radius: 15,
    orbitRadius: 310,
    realDiameter: "120,536 km",
    realDistance: "1,433.5 million km",
    orbitalPeriod: "29.46 years",
    orbitalPeriodDays: 10759,
    description: "Famous for its stunning ring system made of ice and rock. It's the least dense planet.",
    emoji: "♄",
  },
  {
    name: "Uranus",
    color: "#7de8e8",
    glowColor: "#4db8b8",
    radius: 11,
    orbitRadius: 375,
    realDiameter: "51,118 km",
    realDistance: "2,872.5 million km",
    orbitalPeriod: "84.01 years",
    orbitalPeriodDays: 30687,
    description: "An ice giant that rotates on its side. It has a blue-green color from methane in its atmosphere.",
    emoji: "♅",
  },
  {
    name: "Neptune",
    color: "#4466ff",
    glowColor: "#2244cc",
    radius: 10,
    orbitRadius: 430,
    realDiameter: "49,528 km",
    realDistance: "4,495.1 million km",
    orbitalPeriod: "164.8 years",
    orbitalPeriodDays: 60190,
    description: "The windiest planet with speeds over 2,000 km/h. It's the farthest planet from the Sun.",
    emoji: "♆",
  },
];
