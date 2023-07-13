TAG?=latest
REGISTRY=registry.hosting.local
PROJECT=api-frontsale
NAMESPACE=teste-core

up:
	docker compose up --build -d
exec:
	docker compose run -it --entrypoint="" ${PROJECT} /bin/sh
build_image:
	docker build -t ${REGISTRY}/${PROJECT}:${TAG} --target current ./
push_image: build_image
	docker push ${REGISTRY}/${PROJECT}:${TAG}

helm_install:
	helm upgrade --install --namespace=${NAMESPACE} \
	${PROJECT} \
  --set image.repository="${REGISTRY}/${PROJECT}" \
  --set image.tag="${TAG}" \
  ./charts/${PROJECT} --create-namespace
