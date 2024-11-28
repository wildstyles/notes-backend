COMPOSE_LOCAL_FILE := ./docker/docker-compose.local.yml

up:
	docker-compose --env-file ./packages/common/.env -f $(COMPOSE_LOCAL_FILE) -p notes-backend up -d
	turbo dev

up_k8s:
	docker-compose --env-file ./packages/common/.env -f $(COMPOSE_LOCAL_FILE) -p notes-backend up -d
	kubectl apply -f k8s/Namespace.yaml
	kubectl apply -f k8s -R

up_prod:
	docker-compose --env-file ./packages/common/.env -f ./docker/docker-compose.prod.yml -p notes-backend up -d

stop:
	docker-compose -p nodes-backend stop

build_and_push_to_ecr:
	docker build -t $(prefix)/$(project):$(tag) --build-arg PROJECT=$(project) --build-arg PORT=$(port) -f ./docker/Dockerfile .
	docker push $(prefix)/$(project):$(tag)

build_gateway_service:
	docker build -t notes-backend/gateway-service:latest --build-arg PROJECT=gateway-service --build-arg PORT=3000 -f ./docker/Dockerfile .

build_supplier_service:
	docker build -t notes-backend/supplier-service:latest --build-arg PROJECT=supplier-service -f ./docker/Dockerfile .

build_user_service:
	docker build -t notes-backend/user-service:latest --build-arg PROJECT=user-service -f ./docker/Dockerfile .
