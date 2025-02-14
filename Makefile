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


#XN62G5A;!4j/ALnC4C*5#A#yM@-%:,$D