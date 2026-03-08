// Source of truth for card effect definitions. Static reference data (not seeded to DB).
export const cardEffects = [
  {
    key: "MARTYRDOM",
    title: "Martyrdom",
    description: "Does something upon death.",
  },
  {
    key: "REVIVAL",
    title: "Revival",
    description: "Does something upon being revived.",
  },
  {
    key: "BESTOW",
    title: "Bestow",
    description: "Buff a specific target.",
  },
  {
    key: "CURSE",
    title: "Curse",
    description: "Debuff a specific target.",
  },
  {
    key: "PREACH",
    title: "Preach",
    description: "Affect all characters on the board.",
  },
  {
    key: "IMPRISON",
    title: "Imprison",
    description: "Lock a character down for one turn.",
  },
  {
    key: "BANISH",
    title: "Banish",
    description: "Destroy a character.",
  },
] as const;

export type EffectTypeKey = (typeof cardEffects)[number]["key"];

export const cardEffectsByKey = new Map(
  cardEffects.map((effect) => [effect.key, effect]),
);
