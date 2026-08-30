export type Tone = "blue" | "amber" | "red" | "green" | "violet" | "gray";

export type Station = {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
};

export type Track = {
  id: string;
  from: string;
  to: string;
  active?: boolean;
  occupied?: boolean;
  lines: number;
  type: "MAIN" | "BRANCH" | "YARD";
  speedLimit: number;
};

export type TrainStatus = "RUNNING" | "HELD" | "DELAYED";

export type Train = {
  id: string;
  name: string;
  from: string;
  to: string;
  route: string[];
  progress: number;
  speed: number;
  maxSpeed: number;
  priority: number;
  delay: number;
  color: "blue" | "green";
  status: TrainStatus;
};

export type Signal = {
  id: string;
  from: string;
  to: string;
  progress: number;
  state: "GREEN" | "RED";
};

export type Junction = {
  id: string;
  name: string;
  node: string;
  x: number;
  y: number;
  status: "FREE" | "OCCUPIED";
  routeLabel: string;
};

export type World = {
  stations: Station[];
  tracks: Track[];
  trains: Train[];
  signals: Signal[];
  junctions: Junction[];
};

export type Position = {
  x: number;
  y: number;
};

export type DashboardStat = {
  title: string;
  value: string;
  detail: string;
  icon: string;
  tone: Tone;
};

export type EventEntry = {
  id: number;
  time: string;
  message: string;
  tone: Tone;
};

export type TrafficDecision = {
  conflict: boolean;
  title: string;
  recommendedAction: string;
  targetStation: string;
  reason: string;
  delaySavedMinutes: number;
  confidence: number;
  holdTrainId?: string;
};
