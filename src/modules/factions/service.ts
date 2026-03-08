import { factions, type FactionKey } from "./catalog.js";

export function listFactions(): FactionKey[] {
  return [...factions];
}
