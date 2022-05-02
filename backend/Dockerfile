# syntax=docker/dockerfile:1

FROM node:16

COPY index.js ./
COPY index.js.map ./

EXPOSE 8090

CMD [ "node", "--enable-source-maps", "index.js" ]