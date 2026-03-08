// Source of truth for faction keys. Static reference data (not seeded to DB).
export const factions = [
  "NEUTRAL",
  "PENITENT_CHOIR",
  "SILENT_BASILICA",
  "OSSUARY_THRONE",
  "TRIBUNAL_OF_ASH",
  "ROOTBOUND_COVENANT",
] as const;

export type FactionKey = (typeof factions)[number];

