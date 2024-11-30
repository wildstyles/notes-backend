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
	
build:
	docker build -t $(prefix)/$(project):$(tag) --build-arg PROJECT=$(project) --build-arg PORT=$(port) -f ./docker/Dockerfile .

build_and_push_to_ecr:
	make build prefix=$(prefix) project=$(project) port=$(port) tag=$(tag)
	docker push $(prefix)/$(project):$(tag)

build_gateway_service:
	make build prefix=notes-backend project=gateway-service port=3000 tag=0.1.0

build_supplier_service:
	make build prefix=notes-backend project=supplier-service tag=0.1.0

build_user_service:
	make build prefix=notes-backend project=user-service tag=0.1.0

helm_upgrade:
	helm upgrade \
	--namespace notes-backend \
	--create-namespace \
	--install \
	--wait \
	--timeout 10s \
	--render-subchart-notes \
	--set global.image.tag=0.1.0 \
	notes-backend-local \
	helm
