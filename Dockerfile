FROM node:19-alpine3.16 AS base
ARG UID=node
ARG DIR=/usr/local/share/app

RUN apk --no-cache add

FROM base AS permission
RUN mkdir -p ${DIR}
RUN chown -R ${UID}:${UID} ${DIR}

FROM permission AS npminstall
USER ${UID}
WORKDIR ${DIR}
COPY --chown=${UID}:${UID} package*.json ./
RUN npm cache clean --force
RUN npm install

FROM npminstall AS current
USER ${UID}
WORKDIR ${DIR}

COPY ./ ./

EXPOSE 3000

CMD [ "npm", "run", "start"]
