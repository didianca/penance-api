// This module is the source of truth for fixed effect metadata.
// The GraphQL layer can read from here without needing to know how
// the effect list is stored or generated.
export const effects = [
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

export type EffectTypeKey = (typeof effects)[number]["key"];

// This lookup map is useful when a card stores only effect keys and
// we need to expand them into full effect objects for GraphQL.
export const effectsByKey = new Map(
  effects.map((effect) => [effect.key, effect]),
);
