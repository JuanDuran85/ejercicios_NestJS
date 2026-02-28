<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# AmyList

> Example project built with NestJS, GraphQL and TypeORM (Postgres). This README explains how to install, configure, run the app and use the seed.

**Description**

- AmyList is an API built with NestJS exposing a GraphQL endpoint to manage users and items. It includes a `seed` module that can populate the database with sample data.

**Requirements**

- Node.js >= 18
- npm or yarn
- Docker (optional, recommended for Postgres)

**Important files & locations**

- `src/seed/data/seed-data.ts` — seed data (`SEED_USERS`, `SEED_ITEMS`)
- `src/seed/seed.resolver.ts` — GraphQL `executeSeed` mutation
- `src/app.module.ts` — TypeORM and module configuration

**Quick install**

1. Open a terminal in the project folder:

```bash
cd amylist
```

2. Create a `.env` file in the project root using `.env.example` as a template.

3. If you want to use the supplied Docker Compose Postgres, bring it up:

```bash
docker compose up -d
```

4. Install dependencies and start in development mode:

```bash
npm install
npm run start:dev
```

The app listens on the port defined by `PORT` (defaults to `3000`).

**Environment variables (recommended)**
Use `.env` or `.env.local` with these variables (example provided in `.env.example`):

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amylist
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret
PORT=3000
ENV=dev
```

- `ENV`: when set to `prod` the seed runner is blocked (prevents running seed in production).

**Using the seed**
There are two ways to run the seed:

- GraphQL mutation (requires app running):
  1. Open GraphQL playground: `http://localhost:3000/graphql`.
  2. Run the mutation:

  ```graphql
  mutation {
    executeSeed
  }
  ```

- CLI runner (no HTTP required):

  ```bash
  npm run seed
  ```

  The CLI runner creates a minimal Nest application context and calls the `SeedService.executeSeed()` method.

Warning: `executeSeed` deletes existing `users` and `items` records before inserting sample data. Do not run on production databases.

The `quantity` field for `SEED_ITEMS` is now populated with a random integer between `0` and `35` when not explicitly provided.

**Useful scripts**

- `npm run start:dev` — start in development (watch)
- `npm run start` — run (production)
- `npm run build` — compile
- `npm run seed` — execute seed from CLI (uses `ts-node` to run `src/seed/run-seed.ts`)
- `npm test` — run tests

**Notes**

- TypeORM configuration is in `src/app.module.ts` and reads `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` from environment variables.
- Authentication uses `JWT_SECRET`.
- If using Docker, update credentials in `.env` and `docker compose` will use them to initialize the database.

## Using Docker

1. Build
```bash
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

2. Run
```bash
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

3. Stop
```bash
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod down
```

**Note**: The `docker-compose.prod.yaml` file is configured to use the `.env.prod` file.

4. Create image with name application
```bash
  docker build -t nest-graphql-prod .
```

5. Run image
```bash
  docker run --env-file=.env.prod -p 3000:3000 nest-graphql-prod
```

6. Stop image
```bash
  docker stop <container_id>
  docker rm <container_id>
```