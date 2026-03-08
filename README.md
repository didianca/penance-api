# Penance API

TypeScript GraphQL API for the Penance game app: card definitions, factions, and effects. Built to support a trading-card-style builder and (later) live match functionality.

## Stack

| Layer        | Tech |
|-------------|------|
| Runtime     | Node.js, TypeScript (ESM) |
| API         | Apollo Server 5, GraphQL 16 |
| Database    | DynamoDB Local only (Dynalite via AWS SDK v3); hosted AWS DynamoDB not yet implemented |
| Tooling     | tsx, cross-env, dotenv, uuid |

## Ports

| Port  | Service        | Notes |
|-------|----------------|-------|
| 4000  | GraphQL API    | Default; override with `PORT` |
| 8000  | Dynalite       | DynamoDB Local; used when `PENANCE_ENV=local` |
| 8002  | dynamodb-admin | Optional UI to browse tables; run via `npm run dynamodb:ui` |

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm**

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start DynamoDB Local (Dynalite)

In a terminal, start Dynalite and leave it running:

```bash
npm run dynamodb:local
```

This listens on **port 8000**. The API will connect here when `PENANCE_ENV=local`.

### 3. Seed the database

In another terminal (with Dynalite running):

```bash
npm run seed
```

This creates the `penance-local` table and seeds card data from `src/modules/cards/catalog.ts`. Factions and card effects are static data in `src/modules` and are not stored in DynamoDB.

### 4. Start the API

In the same or another terminal:

```bash
npm run dev
```

The GraphQL server runs at **http://localhost:4000**. Use Apollo Sandbox or any GraphQL client.

### 5. (Optional) Browse tables

With Dynalite running:

```bash
npm run dynamodb:ui
```

Then open **http://localhost:8002** to inspect the local DynamoDB tables.

---

## Day-to-day

1. Start Dynalite: `npm run dynamodb:local`
2. Start the API: `npm run dev`
3. Re-run `npm run seed` only when you want to reset or refresh card data.

## Environment

- **PENANCE_ENV** — Backend for DynamoDB:
  - `local` (default for dev): use Dynalite at `http://localhost:8000` — **this is the only mode implemented today**
  - `dev` (or other): would use real AWS DynamoDB in `us-east-1` — **not yet implemented**
- Table name is **`penance-{env}`** (e.g. `penance-local`, `penance-dev`). Single-table design.

The dev script and seed script set `PENANCE_ENV=local` via `cross-env` so you don’t need a `.env` for basic local use.

## Project layout

```
src/
  index.ts           # Server bootstrap
  schema/            # GraphQL typeDefs + resolvers
  dynamodb/          # DynamoDB client, table name (env-based)
  modules/
    cards/           # Card catalog (seed source), service (DynamoDB reads)
    effects/         # Card effects (static catalog + service)
    factions/        # Factions (static catalog + service)
scripts/
  seed.ts            # Seeds cards into DynamoDB
```

Data flow: **GraphQL → resolvers → services**. Cards are read from DynamoDB; factions and effects are served from in-memory catalogs.

## Example query

```graphql
query {
  health
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

`health` returns something like: `ok | dynamo: http://localhost:8000` so you can confirm which DynamoDB endpoint is in use.

## Scripts

| Command              | Purpose |
|----------------------|--------|
| `npm run dev`        | Start API with tsx watch (PENANCE_ENV=local) |
| `npm run build`      | Compile TypeScript to `dist/` |
| `npm run start`      | Run compiled `dist/index.js` (set PENANCE_ENV if needed) |
| `npm run typecheck`  | `tsc --noEmit` |
| `npm run seed`       | Seed cards into local DynamoDB (Dynalite must be running) |
| `npm run dynamodb:local` | Start Dynalite on port 8000 |
| `npm run dynamodb:ui`   | Start dynamodb-admin on port 8002 |

## Planned next steps

- add DynamoDB client configuration
- introduce repository files for persistence
- replace in-memory card data with DynamoDB reads
- add mutations for creating and updating cards
- document sample demo queries for interview use

## Apollo Server preview
![Apollo Server preview](https://cdn.discordapp.com/attachments/374978090163503116/1480322670137708605/ap-serv.png?ex=69af416b&is=69adefeb&hm=199a94871e40db89d525b289ab016122e75da1ea5cb16cadf141c60b17e3bcd2&)


## Local DynamoDB Admin preview
![Local DynamoDB Admin preview](https://cdn.discordapp.com/attachments/374978090163503116/1480322670791888988/dyn-db.png?ex=69af416b&is=69adefeb&hm=ac7e25c5c80cb34ae813c07e2d16843c4f0c6bb7a07b3c17f837cda302daef62&)
