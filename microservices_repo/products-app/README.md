

## Developments
1. Clone the repository
2. Create a .env file
3. Run `docker compose up --build`


## Docker Compose Build Prod

1. `docker build -f Dockerfile.prod -t <image_name> .`
2. `docker compose -f docker-compose.prod.yml build`
