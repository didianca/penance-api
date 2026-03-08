import { effects, effectsByKey, type EffectTypeKey } from "./catalog.js";

export function listEffects() {
  return effects;
}

export function getEffectsByKeys(effectTypes: readonly EffectTypeKey[]) {
  return effectTypes
    .map((effectType) => effectsByKey.get(effectType))
    .filter(
      (
        effect,
      ): effect is (typeof effects)[number] =>
        effect !== undefined,
    );
}
