import type { EffectTypeKey } from "../effects/catalog.js";

// Card templates for seeding. Seeded to DynamoDB; IDs assigned at seed time.
// Cards reference card effects by key; effect type is inferred from the effect definition.
export const cardTemplates = [
  {
    name: "Ashen Witness",
    description: "A faithful zealot who strengthens allies through sacrifice.",
    cost: 3,
    damage: 2,
    health: 4,
    rarity: "RARE",
    faction: "PENITENT_CHOIR",
    cardEffects: ["MARTYRDOM", "BESTOW"] as readonly EffectTypeKey[],
  },
  {
    name: "Basilica Warden",
    description: "A stoic defender who curses enemies who approach.",
    cost: 4,
    damage: 3,
    health: 5,
    rarity: "EPIC",
    faction: "SILENT_BASILICA",
    cardEffects: ["CURSE", "IMPRISON"] as readonly EffectTypeKey[],
  },
  {
    name: "Censer Prophet",
    description: "A robed oracle whose sermons wash across the whole field.",
    cost: 5,
    damage: 4,
    health: 4,
    rarity: "LEGENDARY",
    faction: "TRIBUNAL_OF_ASH",
    cardEffects: ["PREACH", "REVIVAL"] as readonly EffectTypeKey[],
  },
] as const;

export type CardTemplate = (typeof cardTemplates)[number];
export type CardRecord = CardTemplate & { id: string };
