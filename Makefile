.PHONY: help install dev build start lint docker-build up down logs restart clean

IMAGE ?= web3max:latest

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости
	npm ci --frozen-lockfile

dev: ## Запустить дев-сервер
	npm run dev

build: ## Собрать проект локально
	npm run build

start: ## Запустить прод-сборку локально
	npm run start

docker-build: ## Собрать docker-образ
	docker build -t $(IMAGE) .

up: ## Поднять контейнеры
	docker compose up -d --build

down: ## Остановить контейнеры
	docker compose down

restart: ## Перезапустить контейнеры
	docker compose down && docker compose up -d --build

logs: ## Показать логи
	docker compose logs -f

clean: ## Удалить артефакты сборки
	rm -rf .next out node_modules tsconfig.tsbuildinfo
