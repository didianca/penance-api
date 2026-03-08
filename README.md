# Penance API

 TypeScript, GraphQL API for the Penance game app.

The goal of this API is to power a trading-card-style card builder and, later, live match functionality for the Penance universe. Right now the API is focused on the card-definition side of the domain. The longer-term direction is to let the frontend query card data for collection browsing, card detail views, filters, and eventually create/update flows backed by DynamoDB.

## What This API Is Meant To Power

This API is being built to support:

- card browsing by faction
- card detail views
- a future card creation and editing workflow
- a future match layer where card definitions can later be used by runtime game state

The current GraphQL schema models a card-definition style domain:

- `CardTemplate`
- `Effect`
- `Faction`
- `EffectType`

## Current Stack

- `TypeScript`
- `Apollo Server`
- `GraphQL`
- `Node.js`
- `uuid`
- planned: `DynamoDB` via AWS SDK v3

## Current Architecture

The project is organized in layers so the API can evolve cleanly from mock data to DynamoDB-backed persistence.

- `src/schema`
  - GraphQL schema and resolvers
- `src/modules`
  - feature/domain modules such as cards, effects, and factions
- `src/index.ts`
  - server bootstrap

Right now the data flow looks like this:

`GraphQL schema -> resolvers -> services -> in-memory module data`

The planned next step is:

`GraphQL schema -> resolvers -> services -> repositories -> DynamoDB`

## Current Status

The API currently supports read-side development with mock in-memory data for:

- `health`
- `cards`
- `card(id)`
- `effects`
- `factions`

This is intentional. The project is being built in layers:

1. establish the schema
2. establish resolvers and domain modules
3. replace mock data with DynamoDB-backed persistence
4. add write operations and richer workflows

## DynamoDB and environment

- **PENANCE_ENV** chooses the backend: `local` (DynamoDB Local) or `dev` (hosted AWS). Table naming follows **`penance-{env}-{table}`**, e.g. `penance-local-cards`, `penance-dev-cards`. 

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The server runs locally at:

```text
http://localhost:4000/
```

## Example Query

```graphql
query {
  cards {
    id
    name
    rarity
    faction
    effectTypes
    effects {
      key
      title
      description
    }
  }
}
```

## Planned Next Steps

- add DynamoDB client configuration
- introduce repository files for persistence
- replace in-memory card data with DynamoDB reads
- add mutations for creating and updating cards
- document sample demo queries for interview use
