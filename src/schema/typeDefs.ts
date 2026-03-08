export const typeDefs = `#graphql
  enum Rarity {
    COMMON
    RARE
    EPIC
    LEGENDARY
  }

  enum Faction {
    NEUTRAL
    PENITENT_CHOIR
    SILENT_BASILICA
    OSSUARY_THRONE
    TRIBUNAL_OF_ASH
    ROOTBOUND_COVENANT
  }

  enum EffectType {
    MARTYRDOM
    REVIVAL
    BESTOW
    CURSE
    PREACH
    IMPRISON
    BANISH
  }

  type EffectDefinition {
    key: EffectType!
    title: String!
    description: String!
  }

  type CardTemplate {
    id: ID!
    name: String!
    description: String!
    cost: Int!
    damage: Int!
    health: Int!
    rarity: Rarity!
    faction: Faction!
    effectTypes: [EffectType!]!
    effects: [EffectDefinition!]!
  }

  type Query {
    health: String!
    cards: [CardTemplate!]!
    card(id: ID!): CardTemplate
    effects: [EffectDefinition!]!
    factions: [Faction!]!
  }
`;
