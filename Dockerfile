FROM node:16.14.0
WORKDIR /game

COPY . .
RUN npm i
CMD npm run start