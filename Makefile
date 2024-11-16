COMPOSE_LOCAL_FILE := ./docker/docker-compose.local.yml

up:
	docker-compose --env-file ./packages/common/.env -f $(COMPOSE_LOCAL_FILE) -p nodes-backend up -d
	turbo dev

stop:
	docker-compose -p nodes-backend stop
