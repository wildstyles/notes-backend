COMPOSE_TEST_FILE := docker-compose.test.yml

TEST_ENV_FILE := .env.test

test_e2e:
	docker-compose --env-file $(TEST_ENV_FILE) -f $(COMPOSE_TEST_FILE) up -d
	-npx dotenvx run -f $(TEST_ENV_FILE) -- sh -c "cd ../../packages/common && pnpm migration:up"
	-npx dotenvx run -f $(TEST_ENV_FILE) -- pnpm jest --config ./test/jest-e2e.ts
	docker-compose --env-file $(TEST_ENV_FILE) -f $(COMPOSE_TEST_FILE) down -v