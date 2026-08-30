"use client";

import { useEffect, useMemo, useState } from "react";
import { aiDecision } from "./ai";
import { createInitialWorld } from "./data";
import { createEvent, createInitialEvents } from "./events";
import { advanceWorld, getDashboardStats } from "./simulation";
import type { Tone } from "./types";

export function useRailMindSimulation() {
  const [world, setWorld] = useState(createInitialWorld);
  const [events, setEvents] = useState(createInitialEvents);
  const [running, setRunning] = useState(false);
  const [nextEventId, setNextEventId] = useState(6);

  const decision = useMemo(() => aiDecision(world), [world]);
  const stats = useMemo(() => getDashboardStats(world, decision), [world, decision]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = window.setInterval(() => {
      setWorld((current) => advanceWorld(current, aiDecision(current)));
    }, 140);

    return () => window.clearInterval(id);
  }, [running]);

  function log(message: string, tone: Tone = "blue") {
    setEvents((current) => [createEvent(nextEventId, message, tone), ...current].slice(0, 8));
    setNextEventId((id) => id + 1);
  }

  return {
    world,
    events,
    running,
    decision,
    stats,
    start() {
      setRunning(true);
      log("Simulation started", "green");
    },
    pause() {
      setRunning(false);
      log("Simulation paused", "amber");
    },
    reset() {
      setRunning(false);
      setWorld(createInitialWorld());
      setEvents(createInitialEvents());
      setNextEventId(6);
    },
    injectDelay() {
      setWorld((current) => ({
        ...current,
        trains: current.trains.map((train) => train.id === "12560" ? { ...train, status: "DELAYED", delay: train.delay + 5 } : train)
      }));
      log("Delay injected on Train 12560", "amber");
    },
    signalFailure() {
      setWorld((current) => ({
        ...current,
        signals: current.signals.map((signal) => signal.id === "S2" ? { ...signal, state: "RED" } : signal)
      }));
      log("Signal S2 set to stop", "red");
    }
  };
}
