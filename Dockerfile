FROM node:16.14.0 as build
WORKDIR /game

COPY . .
RUN npm i
CMD npm run start