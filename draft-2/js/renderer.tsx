import { getStation, getTrainPosition } from "./simulation";
import type { DashboardStat, EventEntry, TrafficDecision, Train, World } from "./types";

type ControlsProps = {
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onInjectDelay: () => void;
  onSignalFailure: () => void;
};

export function Header() {
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

export function StatsGrid({ stats }: { stats: DashboardStat[] }) {
  return (
    <section className="statsGrid">
      {stats.map((stat) => <StatCard key={stat.title} stat={stat} />)}
    </section>
  );
}

function StatCard({ stat }: { stat: DashboardStat }) {
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

export function RailwayMap({ world }: { world: World }) {
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
        {world.tracks.map((track) => {
          const from = getStation(world, track.from);
          const to = getStation(world, track.to);
          const className = track.occupied ? "track occupied" : track.active ? "track active" : "track";

          return (
            <g key={track.id}>
              <line x1={from.x} y1={from.y - 3} x2={to.x} y2={to.y - 3} className={className} />
              <line x1={from.x} y1={from.y + 7} x2={to.x} y2={to.y + 7} className={className} />
            </g>
          );
        })}
        <line x1="470" y1="250" x2="555" y2="250" className="occupiedTrack" />
        {world.junctions.map((junction) => (
          <g key={junction.id} className="junction">
            <polygon points={`${junction.x},246 ${junction.x + 10},256 ${junction.x},266 ${junction.x - 10},256`} />
            <text x={junction.x + 22} y="262">{junction.name}</text>
            <rect x={junction.x - 20} y="276" width="92" height="30" rx="5" />
            <text x={junction.x + 26} y="297" className="badgeText">{junction.status}</text>
            <text x={junction.x - 20} y="330" className="routeText">{junction.routeLabel}</text>
          </g>
        ))}
        {world.trains.map((train) => <TrainShape key={train.id} world={world} train={train} />)}
        {world.stations.map((item) => (
          <g key={item.id} className="station">
            <circle cx={item.x} cy={item.y} r="11" />
            <circle cx={item.x} cy={item.y} r="7" />
            <rect x={item.x - 33} y={item.y - 47} width="24" height="24" rx="4" />
            <text x={item.x - 21} y={item.y - 30} className="code">{item.code}</text>
            <text x={item.x - 4} y={item.y - 31} className="name">{item.name}</text>
            <circle cx={item.x + 88} cy={item.y - 34} r="6" className="stateDot" />
          </g>
        ))}
        <Legend />
      </svg>
    </section>
  );
}

function TrainShape({ world, train }: { world: World; train: Train }) {
  const position = getTrainPosition(world, train);

  return (
    <g className={`train ${train.color} ${train.status.toLowerCase()}`} filter="url(#glow)">
      <rect x={position.x - 68} y={position.y - 18} width="72" height="20" rx="4" />
      <rect x={position.x + 10} y={position.y - 18} width="58" height="20" rx="4" />
      <line x1={position.x - 61} y1={position.y - 10} x2={position.x - 6} y2={position.y - 10} />
      <line x1={position.x + 18} y1={position.y - 10} x2={position.x + 60} y2={position.y - 10} />
      <text x={position.x - 38} y={position.y + 32}>{train.id}</text>
      <text x={position.x - 39} y={position.y + 55} className="speed">{train.status === "HELD" ? "held" : `${train.speed} km/h`}</text>
    </g>
  );
}

function Legend() {
  return (
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
  );
}

export function DecisionPanel({ decision, events }: { decision: TrafficDecision; events: EventEntry[] }) {
  return (
    <aside className="sideStack">
      <section className="shell decision">
        <h2>✦ AI Decision Engine</h2>
        <div className="decisionCard">
          <h3>{decision.title}</h3>
          <div className="actionBox">
            <div>
              <small>Recommended Action</small>
              <strong>{decision.recommendedAction}</strong>
              <span>{decision.targetStation}</span>
            </div>
            <div className="shield">◇</div>
          </div>
          <div className="reason">
            <small>Reason</small>
            <p>{decision.reason}</p>
          </div>
          <div className="metrics">
            <div>
              <small>Estimated Delay Saved</small>
              <strong>{decision.delaySavedMinutes} min</strong>
            </div>
            <div>
              <small>Confidence Score</small>
              <strong>{decision.confidence}%</strong>
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
          {events.map((event) => (
            <li key={event.id}>
              <time>{event.time}</time>
              <span>{event.message}</span>
              <b className={event.tone} />
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}

export function Controls({ running, onStart, onPause, onReset, onInjectDelay, onSignalFailure }: ControlsProps) {
  return (
    <section className="shell controls">
      <h2>⚙ Simulation Controls</h2>
      <div>
        <button className="control green" onClick={onStart}>▶ {running ? "Simulation Running" : "Start Simulation"}</button>
        <button className="control amber" onClick={onPause}>▮▮ Pause</button>
        <button className="control blue" onClick={onReset}>⟳ Reset</button>
        <button className="control violet" onClick={onInjectDelay}>ϟ Inject Delay</button>
        <button className="control red" onClick={onSignalFailure}>♙ Signal Failure</button>
        <button className="control gray">▥ Generate Report</button>
      </div>
    </section>
  );
}
