# For local machine Development Test
.PHONY: build-development
build-development:
	docker compose -f ./docker/development/docker-compose.yml build

.PHONY: start-development
start-development:
	docker compose -f ./docker/development/docker-compose.yml up -d

.PHONY: stop-development
stop-development:
	docker compose -f ./docker/development/docker-compose.yml stop

.PHONY: delete-development
delete-development:
	docker compose -f ./docker/development/docker-compose.yml down

# For test server before production
.PHONY: start-staging
start-staging:
	docker compose -f ../docker-compose.yml up -d
  
# For main production server 
.PHONY: start-production
start-production:
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production:
	docker compose -f ./docker/production/docker-compose.yml stop

.PHONY: delete-production
delete-production:
	docker compose -f docker/production/docker-compose.yml down