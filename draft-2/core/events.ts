import { initialEvents } from "./data";
import type { EventEntry, Tone } from "./types";

export function createInitialEvents(): EventEntry[] {
  return initialEvents.map((event) => ({ ...event }));
}

export function createEvent(id: number, message: string, tone: Tone = "blue"): EventEntry {
  return {
    id,
    time: "14:42:41",
    message,
    tone
  };
}
