
# SUBIR CONTAINER
docker run -d \
  --name sentinelai-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sentinelai \
  -p 5432:5432 \
  -v sentinelai-data:/var/lib/postgresql/data \
  postgres:15
