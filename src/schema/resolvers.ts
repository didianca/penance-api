import {
  getCardEffectsByKeys,
  listCardEffects,
} from "../modules/effects/service.js";
import { getCardById, listCards } from "../modules/cards/service.js";
import { listFactions } from "../modules/factions/service.js";
import type { CardRecord } from "../modules/cards/catalog.js";

export const resolvers = {
  Query: {
    health: () => "ok",
    cards: () => listCards(),
    card: (_parent: unknown, args: { id: string }) => getCardById(args.id),
    cardEffects: () => listCardEffects(),
    factions: () => listFactions(),
  },
  CardTemplate: {
    // Cards store effect keys; this resolver expands them into full card effect objects (types inferred from definitions).
    cardEffects: (card: CardRecord) => getCardEffectsByKeys(card.cardEffects),
  },
};
