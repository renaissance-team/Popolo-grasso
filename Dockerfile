FROM node:16.14.0
WORKDIR /game

COPY . .
RUN npm i
EXPOSE 3008
CMD npm run start  
