ARG BASE_IMAGE=node:16-alpine
FROM ${BASE_IMAGE}

RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install --omit=dev
COPY ./src/ /app/
CMD ["node", "index.js"]

