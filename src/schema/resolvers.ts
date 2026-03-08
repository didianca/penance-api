import {
  getEffectsByKeys,
  listEffects,
} from "../modules/effects/service.js";
import { getCardById, listCards } from "../modules/cards/service.js";
import { listFactions } from "../modules/factions/service.js";
import type { CardRecord } from "../modules/cards/catalog.js";

export const resolvers = {
  Query: {
    health: () => "ok",
    cards: () => listCards(),
    card: (_parent: unknown, args: { id: string }) => getCardById(args.id),
    effects: () => listEffects(),
    factions: () => listFactions(),
  },
  CardTemplate: {
    // Cards store only effect keys, so this nested resolver asks the
    // effect service to expand those keys into full effect objects.
    effects: (card: CardRecord) => getEffectsByKeys(card.effectTypes),
  },
};
