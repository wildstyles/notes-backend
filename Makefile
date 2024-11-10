COMPOSE_LOKI_FILE := docker-compose-loki.yml
COMPOSE_SERVICES_FILE := docker-compose.yml
COMPOSE_TEST_FILE := docker-compose.test.yml

TEST_ENV_FILE := .env.test

up:
	docker-compose -f $(COMPOSE_LOKI_FILE) -f $(COMPOSE_SERVICES_FILE) up -d
	docker-compose logs -f

stop:
	docker-compose -f $(COMPOSE_LOKI_FILE) -f $(COMPOSE_SERVICES_FILE) stop

test:
	docker-compose --env-file $(TEST_ENV_FILE) -f $(COMPOSE_TEST_FILE) up -d
	-npx dotenvx run -f $(TEST_ENV_FILE) -- yarn migration:up
	-npx dotenvx run -f $(TEST_ENV_FILE) -- yarn test:e2e
	docker-compose --env-file $(TEST_ENV_FILE) -f $(COMPOSE_TEST_FILE) down