import type { EventEntry, Signal, Station, Track, Train, World } from "./types";

export const stations: Station[] = [
  { id: "A", name: "New Delhi", code: "A", x: 90, y: 118 },
  { id: "B", name: "Anand Vihar", code: "B", x: 520, y: 118 },
  { id: "C", name: "Ghaziabad", code: "C", x: 860, y: 118 },
  { id: "D", name: "Faridabad", code: "D", x: 90, y: 410 },
  { id: "E", name: "Tughlaqabad", code: "E", x: 515, y: 410 },
  { id: "F", name: "Dadri", code: "F", x: 860, y: 410 }
];

export const tracks: Track[] = [
  { id: "AB", from: "A", to: "B", active: true, lines: 2, type: "MAIN", speedLimit: 130 },
  { id: "BC", from: "B", to: "C", active: true, lines: 2, type: "MAIN", speedLimit: 110 },
  { id: "DE", from: "D", to: "E", active: true, lines: 2, type: "MAIN", speedLimit: 100 },
  { id: "EF", from: "E", to: "F", active: true, lines: 2, type: "MAIN", speedLimit: 100 },
  { id: "DB", from: "D", to: "B", lines: 2, type: "BRANCH", speedLimit: 80 },
  { id: "BE", from: "B", to: "E", lines: 1, type: "BRANCH", speedLimit: 60 },
  { id: "BF", from: "B", to: "F", lines: 2, type: "BRANCH", speedLimit: 80 },
  { id: "CF", from: "C", to: "F", lines: 2, type: "BRANCH", speedLimit: 70 }
];

export const trains: Train[] = [
  {
    id: "12012",
    name: "Express 12012",
    from: "A",
    to: "B",
    route: ["A", "B", "C"],
    progress: 0.52,
    speed: 95,
    maxSpeed: 130,
    priority: 100,
    delay: 0,
    color: "blue",
    status: "RUNNING"
  },
  {
    id: "12560",
    name: "Passenger 12560",
    from: "B",
    to: "C",
    route: ["B", "C"],
    progress: 0.42,
    speed: 80,
    maxSpeed: 110,
    priority: 60,
    delay: 0,
    color: "green",
    status: "RUNNING"
  }
];

export const signals: Signal[] = [
  { id: "S1", from: "A", to: "B", progress: 0.92, state: "GREEN" },
  { id: "S2", from: "B", to: "C", progress: 0.12, state: "RED" },
  { id: "S3", from: "D", to: "E", progress: 0.5, state: "GREEN" }
];

export const initialEvents: EventEntry[] = [
  { id: 1, time: "14:41:18", message: "Train 12012 departed New Delhi (A)", tone: "green" },
  { id: 2, time: "14:42:05", message: "Train 12560 entered Anand Vihar (B)", tone: "green" },
  { id: 3, time: "14:42:40", message: "Conflict predicted at Junction", tone: "amber" },
  { id: 4, time: "14:42:41", message: "AI recommended Hold on 12560", tone: "blue" },
  { id: 5, time: "14:42:41", message: "Waiting for operator confirmation", tone: "gray" }
];

export function createInitialWorld(): World {
  return {
    stations: stations.map((station) => ({ ...station })),
    tracks: tracks.map((track) => ({ ...track })),
    trains: trains.map((train) => ({ ...train, route: [...train.route] })),
    signals: signals.map((signal) => ({ ...signal })),
    junctions: [
      {
        id: "J01",
        name: "Junction",
        node: "B",
        x: 520,
        y: 256,
        status: "OCCUPIED",
        routeLabel: "Route: A ↔ C"
      }
    ]
  };
}
