import type { EffectTypeKey } from "../effects/catalog.js";

// This is the temporary in-memory card list for the demo.
// It represents the shape we eventually want to persist in DynamoDB.
// These seeded IDs are fixed so Sandbox queries stay stable between restarts.
export const cards = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    name: "Ashen Witness",
    description: "A faithful zealot who strengthens allies through sacrifice.",
    cost: 3,
    damage: 2,
    health: 4,
    rarity: "RARE",
    faction: "PENITENT_CHOIR",
    effectTypes: ["MARTYRDOM", "BESTOW"] as readonly EffectTypeKey[],
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    name: "Basilica Warden",
    description: "A stoic defender who curses enemies who approach.",
    cost: 4,
    damage: 3,
    health: 5,
    rarity: "EPIC",
    faction: "SILENT_BASILICA",
    effectTypes: ["CURSE", "IMPRISON"] as readonly EffectTypeKey[],
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    name: "Censer Prophet",
    description: "A robed oracle whose sermons wash across the whole field.",
    cost: 5,
    damage: 4,
    health: 4,
    rarity: "LEGENDARY",
    faction: "TRIBUNAL_OF_ASH",
    effectTypes: ["PREACH", "REVIVAL"] as readonly EffectTypeKey[],
  },
] as const;

export type CardRecord = (typeof cards)[number];
