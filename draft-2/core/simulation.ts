import type { DashboardStat, Position, Signal, Station, Train, TrafficDecision, World } from "./types";

export const CONFIG = {
  trainSpeed: 0.004,
  conflictDistance: 0.35
};

export function getStation(world: World, id: string): Station {
  const station = world.stations.find((item) => item.id === id);
  if (!station) {
    throw new Error(`Unknown station: ${id}`);
  }
  return station;
}

export function getTrainPosition(world: World, train: Train): Position {
  const start = getStation(world, train.from);
  const end = getStation(world, train.to);

  return {
    x: start.x + (end.x - start.x) * train.progress,
    y: start.y + (end.y - start.y) * train.progress
  };
}

export function getSignalPosition(world: World, signal: Signal): Position {
  const start = getStation(world, signal.from);
  const end = getStation(world, signal.to);

  return {
    x: start.x + (end.x - start.x) * signal.progress,
    y: start.y + (end.y - start.y) * signal.progress
  };
}

export function advanceWorld(world: World, decision: TrafficDecision): World {
  return {
    ...world,
    trains: world.trains.map((train) => {
      if (decision.holdTrainId === train.id) {
        return { ...train, status: "HELD", delay: train.delay + 1 };
      }

      const signal = world.signals.find((item) => item.from === train.from && item.to === train.to);
      if (signal?.state !== "GREEN") {
        return { ...train, status: "HELD", delay: train.delay + 1 };
      }

      return {
        ...train,
        progress: (train.progress + CONFIG.trainSpeed * (train.speed / 80)) % 1,
        status: "RUNNING"
      };
    })
  };
}

export function getDashboardStats(world: World, decision: TrafficDecision): DashboardStat[] {
  const running = world.trains.filter((train) => train.status === "RUNNING").length;
  const delayed = world.trains.filter((train) => train.status !== "RUNNING" || train.delay > 0).length;
  const activeSignals = world.signals.filter((signal) => signal.state === "GREEN").length;
  const throughput = Math.max(80, 96 - delayed * 2 - (decision.conflict ? 1 : 0)).toFixed(1);

  return [
    { title: "Running Trains", value: running.toString().padStart(3, "0"), detail: "live from simulation", icon: "▣", tone: "blue" },
    { title: "Delayed Trains", value: delayed.toString().padStart(3, "0"), detail: "held or slowed", icon: "◷", tone: "amber" },
    { title: "Conflicts", value: (decision.conflict ? 1 : 0).toString().padStart(3, "0"), detail: "predicted ahead", icon: "△", tone: "red" },
    { title: "Signals Active", value: activeSignals.toString().padStart(3, "0"), detail: "clear aspects", icon: "●", tone: "green" },
    { title: "Throughput", value: `${throughput}%`, detail: "current estimate", icon: "↗", tone: "violet" }
  ];
}
