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
- `CardEffect`
- `Faction`

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
- `cardEffects`
- `factions`

This is intentional. The project is being built in layers:

1. establish the schema
2. establish resolvers and domain modules
3. replace mock data with DynamoDB-backed persistence
4. add write operations and richer workflows

## DynamoDB and environment

- **PENANCE_ENV** chooses the backend: `local` (DynamoDB Local) or `dev` (hosted AWS). Table naming follows **`penance-{env}`** (single table), e.g. `penance-local`, `penance-dev`.
- **Seeded data:** only cards are written by `npm run seed`. Factions and card effects are static reference data in `src/modules` and are not stored in DynamoDB. 

## Local Development

### First-time setup

From a fresh clone:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start local DynamoDB (Dynalite)** — leave this running in one terminal.
   ```bash
   npm run dynamodb:local
   ```

3. **Seed the database** — in a second terminal (with Dynalite already running).
   ```bash
   npm run seed
   ```

4. **Start the API** — in the same or another terminal.
   ```bash
   npm run dev
   ```

5. **Open the API** at **http://localhost:4000** (e.g. Apollo Sandbox for GraphQL).

Optional: run `npm run dynamodb:ui` to browse tables at **http://localhost:8001** (Dynalite must be running).

### Day-to-day

Run `npm run dynamodb:local` and `npm run dev` in two terminals. Re-run `npm run seed` only when you want to reset/refresh card data from the catalog.

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
    cardEffects {
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
