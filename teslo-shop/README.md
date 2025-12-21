<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Teslo Shop

1. Run docker compose up

```bash
docker compose up -d
```

2. Run install
```bash
yarn install
```

3. Clone the file __.env.template__ and rename the copy to __.env__

4. Fill the environment variables defined in the __.env__

5. Run the app in dev mode
```bash
yarn start:dev
```****

6. Rebuild the database with the seed
```bash
http://localhost:3000/api/v2/seed
```

## Stack used
* PostgreSQL
* NestJS