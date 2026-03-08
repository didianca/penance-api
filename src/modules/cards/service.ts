import { cards } from "./catalog.js";

export function listCards() {
  return cards;
}

export function getCardById(id: string) {
  return cards.find((card) => card.id === id) ?? null;
}
