FROM node:19-alpine3.16 AS base
ARG DIR=/usr/local/share/app

FROM base AS npminstall
WORKDIR ${DIR}
COPY package*.json ./

RUN npm install

FROM npminstall AS current
WORKDIR ${DIR}

COPY ./ ./

EXPOSE 3000

CMD [ "npm", "run", "start:prod"]
