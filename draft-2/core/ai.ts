import { CONFIG } from "./simulation";
import type { TrafficDecision, Train, World } from "./types";

export function detectConflict(world: World): [Train, Train] | null {
  const express = world.trains.find((train) => train.id === "12012");
  const passenger = world.trains.find((train) => train.id === "12560");

  if (!express || !passenger) {
    return null;
  }

  const sameExit = express.route.at(-1) === passenger.route.at(-1);
  const closeToJunction = express.to === passenger.from && Math.abs(express.progress - passenger.progress) < CONFIG.conflictDistance;

  return sameExit && closeToJunction ? [express, passenger] : null;
}

export function calculatePriority(train: Train): number {
  return train.priority - train.delay * 0.1;
}

export function aiDecision(world: World): TrafficDecision {
  const conflict = detectConflict(world);

  if (!conflict) {
    return {
      conflict: false,
      title: "No Conflict",
      recommendedAction: "PROCEED AS SIGNALED",
      targetStation: "Network clear",
      reason: "All active train movements are separated by signal protection.",
      delaySavedMinutes: 0,
      confidence: 92
    };
  }

  const [trainA, trainB] = conflict;
  const holdTrain = calculatePriority(trainA) >= calculatePriority(trainB) ? trainB : trainA;
  const priorityTrain = holdTrain.id === trainA.id ? trainB : trainA;

  return {
    conflict: true,
    title: "Conflict Detected Ahead",
    recommendedAction: `HOLD TRAIN ${holdTrain.id}`,
    targetStation: holdTrain.from === "B" ? "at Anand Vihar (B)" : "before junction",
    reason: `${priorityTrain.name} has higher priority and earlier arrival at Ghaziabad`,
    delaySavedMinutes: 4,
    confidence: 98,
    holdTrainId: holdTrain.id
  };
}
