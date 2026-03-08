import { cardEffects, cardEffectsByKey, type EffectTypeKey } from "./catalog.js";

export function listCardEffects(): (typeof cardEffects)[number][] {
  return [...cardEffects];
}

export function getCardEffectsByKeys(keys: readonly EffectTypeKey[]): (typeof cardEffects)[number][] {
  return keys
    .map((key) => cardEffectsByKey.get(key))
    .filter(
      (effect): effect is (typeof cardEffects)[number] => effect !== undefined,
    );
}
