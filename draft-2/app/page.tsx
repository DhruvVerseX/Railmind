"use client";

import { useState } from "react";

type Tone = "blue" | "amber" | "red" | "green" | "violet" | "gray";

type Stat = {
  title: string;
  value: string;
  detail: string;
  icon: string;
  tone: Tone;
};

type Station = {
  id: string;
  name: string;
  code: string;
  x: number;
  y: number;
};

type Track = {
  id: string;
  from: string;
  to: string;
  active?: boolean;
  occupied?: boolean;
};

const stats: Stat[] = [
  { title: "Running Trains", value: "012", detail: "2 from yesterday", icon: "▣", tone: "blue" },
  { title: "Delayed Trains", value: "002", detail: "1 from yesterday", icon: "◷", tone: "amber" },
  { title: "Conflicts", value: "001", detail: "1 from yesterday", icon: "△", tone: "red" },
  { title: "Signals Active", value: "019", detail: "All Functional", icon: "●", tone: "green" },
  { title: "Throughput", value: "95.2%", detail: "3.4% from yesterday", icon: "↗", tone: "violet" }
];

const stations: Station[] = [
  { id: "A", name: "New Delhi", code: "A", x: 90, y: 118 },
  { id: "B", name: "Anand Vihar", code: "B", x: 520, y: 118 },
  { id: "C", name: "Ghaziabad", code: "C", x: 860, y: 118 },
  { id: "D", name: "Faridabad", code: "D", x: 90, y: 410 },
  { id: "E", name: "Tughlaqabad", code: "E", x: 515, y: 410 },
  { id: "F", name: "Dadri", code: "F", x: 860, y: 410 }
];

const tracks: Track[] = [
  { id: "AB", from: "A", to: "B", active: true },
  { id: "BC", from: "B", to: "C", active: true },
  { id: "DE", from: "D", to: "E", active: true },
  { id: "EF", from: "E", to: "F", active: true },
  { id: "DB", from: "D", to: "B" },
  { id: "BE", from: "B", to: "E" },
  { id: "BF", from: "B", to: "F" },
  { id: "CF", from: "C", to: "F" }
];

const events = [
  ["14:41:18", "Train 12012 departed New Delhi (A)", "green"],
  ["14:42:05", "Train 12560 entered Anand Vihar (B)", "green"],
  ["14:42:40", "Conflict predicted at Junction", "amber"],
  ["14:42:41", "AI recommended Hold on 12560", "blue"],
  ["14:42:41", "Waiting for operator confirmation", "gray"]
] as const;

function station(id: string) {
  return stations.find((item) => item.id === id)!;
}

function Header() {
  return (
    <header className="shell header">
      <div className="brand">
        <div className="brandMark">▤</div>
        <div>
          <h1>RailMind <span>AI</span></h1>
          <p>AI-Powered Railway Traffic Control</p>
        </div>
      </div>

      <div className="topMeta">
        <Meta icon="◷" label="Time" value="14:42:12" detail="15 May 2025" />
        <Meta icon="⌖" label="Section" value="New Delhi → Ghaziabad" detail="North Central Railway" />
        <Meta icon="☼" label="Weather" value="32°C" detail="Clear Sky" />
        <div className="online">
          <b />
          <span>System Online</span>
          <small>All Systems Normal</small>
        </div>
        <button className="menuButton" aria-label="Open menu">☰</button>
      </div>
    </header>
  );
}

function Meta({ icon, label, value, detail }: { icon: string; label: string; value: string; detail: string }) {
  return (
    <div className="meta">
      <i>{icon}</i>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <article className={`statCard ${stat.tone}`}>
      <div className="statIcon">{stat.icon}</div>
      <div>
        <h2>{stat.title}</h2>
        <strong>{stat.value}</strong>
        <p>{stat.detail}</p>
      </div>
    </article>
  );
}

function RailwayMap() {
  return (
    <section className="shell mapPanel">
      <div className="panelTitle">
        <h2>▣ Live Railway Network</h2>
        <div className="mapTools">
          <button aria-label="Zoom in">⌕</button>
          <button aria-label="Zoom out">⊕</button>
          <button aria-label="Fit map">⛶</button>
        </div>
      </div>

      <svg className="railMap" viewBox="0 0 980 520" role="img" aria-label="Railway network schematic">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="980" height="520" className="grid" />
        {tracks.map((track) => {
          const from = station(track.from);
          const to = station(track.to);
          return (
            <g key={track.id}>
              <line x1={from.x} y1={from.y - 3} x2={to.x} y2={to.y - 3} className={track.active ? "track active" : "track"} />
              <line x1={from.x} y1={from.y + 7} x2={to.x} y2={to.y + 7} className={track.active ? "track active" : "track"} />
            </g>
          );
        })}
        <line x1="470" y1="250" x2="555" y2="250" className="occupiedTrack" />
        <g className="junction">
          <polygon points="520,246 530,256 520,266 510,256" />
          <text x="542" y="262">Junction</text>
          <rect x="500" y="276" width="92" height="30" rx="5" />
          <text x="546" y="297" className="badgeText">OCCUPIED</text>
          <text x="500" y="330" className="routeText">Route: A ↔ C</text>
        </g>
        <Train x={300} y={100} color="blue" id="12012" speed="95 km/h" />
        <Train x={690} y={100} color="green" id="12560" speed="80 km/h" />
        {stations.map((item) => (
          <g key={item.id} className="station">
            <circle cx={item.x} cy={item.y} r="11" />
            <circle cx={item.x} cy={item.y} r="7" />
            <rect x={item.x - 33} y={item.y - 47} width="24" height="24" rx="4" />
            <text x={item.x - 21} y={item.y - 30} className="code">{item.code}</text>
            <text x={item.x - 4} y={item.y - 31} className="name">{item.name}</text>
            <circle cx={item.x + 88} cy={item.y - 34} r="6" className="stateDot" />
          </g>
        ))}
        <g className="legend">
          <rect x="90" y="470" width="800" height="48" rx="7" />
          <line x1="160" y1="494" x2="190" y2="494" className="track active" />
          <text x="200" y="499">Active Track</text>
          <line x1="310" y1="494" x2="340" y2="494" className="track" />
          <text x="350" y="499">Inactive Track</text>
          <line x1="470" y1="494" x2="500" y2="494" className="occupiedTrack" />
          <text x="510" y="499">Occupied</text>
          <circle cx="620" cy="494" r="7" />
          <text x="638" y="499">Station</text>
          <polygon points="738,486 746,494 738,502 730,494" />
          <text x="760" y="499">Junction</text>
        </g>
      </svg>
    </section>
  );
}

function Train({ x, y, color, id, speed }: { x: number; y: number; color: "blue" | "green"; id: string; speed: string }) {
  return (
    <g className={`train ${color}`} filter="url(#glow)">
      <rect x={x} y={y} width="72" height="20" rx="4" />
      <rect x={x + 78} y={y} width="58" height="20" rx="4" />
      <line x1={x + 7} y1={y + 8} x2={x + 62} y2={y + 8} />
      <line x1={x + 86} y1={y + 8} x2={x + 128} y2={y + 8} />
      <text x={x + 30} y={y + 50}>{id}</text>
      <text x={x + 28} y={y + 73} className="speed">{speed}</text>
    </g>
  );
}

function DecisionPanel() {
  return (
    <aside className="sideStack">
      <section className="shell decision">
        <h2>✦ AI Decision Engine</h2>
        <div className="decisionCard">
          <h3>Conflict Detected Ahead</h3>
          <div className="actionBox">
            <div>
              <small>Recommended Action</small>
              <strong>HOLD TRAIN 12560</strong>
              <span>at Anand Vihar (B)</span>
            </div>
            <div className="shield">◇</div>
          </div>
          <div className="reason">
            <small>Reason</small>
            <p>Express 12012 has higher priority and earlier arrival at Ghaziabad</p>
          </div>
          <div className="metrics">
            <div>
              <small>Estimated Delay Saved</small>
              <strong>4 min</strong>
            </div>
            <div>
              <small>Confidence Score</small>
              <strong>98%</strong>
              <span className="ring" />
            </div>
          </div>
        </div>
      </section>

      <section className="shell eventLog">
        <div className="panelTitle small">
          <h2>▤ Live Event Log</h2>
          <button>View All</button>
        </div>
        <ol>
          {events.map(([time, message, tone]) => (
            <li key={`${time}-${message}`}>
              <time>{time}</time>
              <span>{message}</span>
              <b className={tone} />
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}

function Controls() {
  const [running, setRunning] = useState(false);

  return (
    <section className="shell controls">
      <h2>⚙ Simulation Controls</h2>
      <div>
        <button className="control green" onClick={() => setRunning(true)}>▶ {running ? "Simulation Running" : "Start Simulation"}</button>
        <button className="control amber" onClick={() => setRunning(false)}>▮▮ Pause</button>
        <button className="control blue" onClick={() => setRunning(false)}>⟳ Reset</button>
        <button className="control violet">ϟ Inject Delay</button>
        <button className="control red">♙ Signal Failure</button>
        <button className="control gray">▥ Generate Report</button>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <section className="statsGrid">
        {stats.map((stat) => <StatCard key={stat.title} stat={stat} />)}
      </section>
      <section className="workspace">
        <RailwayMap />
        <DecisionPanel />
      </section>
      <Controls />
    </main>
  );
}
