"use client";

import { useRailMindSimulation } from "../core/main";
import { Controls, DecisionPanel, Header, RailwayMap, StatsGrid } from "../core/renderer";

export default function Home() {
  const simulation = useRailMindSimulation();

  return (
    <main>
      <Header />
      <StatsGrid stats={simulation.stats} />
      <section className="workspace">
        <RailwayMap world={simulation.world} />
        <DecisionPanel decision={simulation.decision} events={simulation.events} />
      </section>
      <Controls
        running={simulation.running}
        onStart={simulation.start}
        onPause={simulation.pause}
        onReset={simulation.reset}
        onInjectDelay={simulation.injectDelay}
        onSignalFailure={simulation.signalFailure}
      />
    </main>
  );
}
