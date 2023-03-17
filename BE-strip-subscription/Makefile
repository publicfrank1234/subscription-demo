TIMESTAMP := $(shell date +"%Y.%m.%d.%H.%M")
ENV ?= dev
ROOT := $(shell git rev-parse --show-toplevel)


-include $(ROOT)/infrastructure/make-utils/env.mk
-include $(ROOT)/infrastructure/make-utils/docker.mk


.PHONY: docker-test
docker-test: docker-build  ## Builds the docker container and runs tests in the docker environment
	@echo Running Docker Test
	docker run -it $(PRIMARY_DOCKER_TAG) bash -c "make test"

push: docker-build-and-push

ecs-deploy: docker-build-and-push-and-ecs-deploy
	@echo "Websocket Room ECS Deployed"


.PHONY: help
help:
	@echo "List of valid make commands:"
	@awk 'BEGIN {FS = ": .*##"; printf "\033[36m\033[0m"} /^[$$()% 0-9a-zA-Z_-]+(\\:[$$()% 0-9a-zA-Z_-]+)*:.*?##/ { gsub(/\\:/,":", $$1); printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST) | sort