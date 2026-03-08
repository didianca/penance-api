// Factions are fixed values for the current demo, so a small in-memory
// catalog is enough until we decide they need persistence of their own.
export const factions = [
  "NEUTRAL",
  "PENITENT_CHOIR",
  "SILENT_BASILICA",
  "OSSUARY_THRONE",
  "TRIBUNAL_OF_ASH",
  "ROOTBOUND_COVENANT",
] as const;

export type FactionKey = (typeof factions)[number];

