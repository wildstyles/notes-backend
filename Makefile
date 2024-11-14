COMPOSE_LOKI_FILE := docker-compose-loki.yml
COMPOSE_SERVICES_FILE := docker-compose.yml

up:
	docker-compose -f $(COMPOSE_LOKI_FILE) -f $(COMPOSE_SERVICES_FILE) up -d
	docker-compose logs -f

stop:
	docker-compose -f $(COMPOSE_LOKI_FILE) -f $(COMPOSE_SERVICES_FILE) stop
