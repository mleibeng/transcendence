all: build run

build:
	docker-compose build

run:
	docker-compose up

clean:
	docker-compose down
	docker system prune -f

fclean: clean
	docker volume rm $$(docker volume ls -q)

re: fclean all

.PHONY: all clean fclean re