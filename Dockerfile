FROM node:14.16.1-alpine

WORKDIR /test

COPY package*.json ./
COPY ormconfig.json ./
RUN npm i -g npm@latest
RUN npm i -g typeorm
RUN npm i -g ts-node
RUN npm i

COPY . .

CMD [ "ts-node", "src/index.ts" ]
