FROM node:19.9.0-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]