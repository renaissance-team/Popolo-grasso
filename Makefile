deploy:
	docker build -t popollo-grasso .
	heroku container:push web -a popollo-grasso
	heroku container:release web -a popollo-grasso
	heroku open	-a popollo-grasso

run:
	docker run -p 5000:3002 -d popollo-grasso
	