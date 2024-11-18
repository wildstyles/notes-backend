COMPOSE_LOCAL_FILE := ./docker/docker-compose.local.yml

up:
	docker-compose --env-file ./packages/common/.env -f $(COMPOSE_LOCAL_FILE) -p notes-backend up -d
	turbo dev

up_prod:
	docker-compose --env-file ./packages/common/.env -f ./docker/docker-compose.prod.yml -p notes-backend up -d

stop:
	docker-compose -p nodes-backend stop

build_and_push_to_ecr:
	docker build -t $(project):$(tag) --build-arg PROJECT=$(project) --build-arg PORT=$(port) -f ./docker/Dockerfile .
	docker push $(project):$(tag)

build_gateway_service:
	docker build -t gateway-service:latest --build-arg PROJECT=gateway-service --build-arg PORT=3000 -f ./docker/Dockerfile .

build_supplier_service:
	docker build -t supplier-service:latest --build-arg PROJECT=supplier-service -f ./docker/Dockerfile .

build_user_service:
	docker build -t user-service:latest --build-arg PROJECT=user-service -f ./docker/Dockerfile .
