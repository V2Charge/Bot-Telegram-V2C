ARG BASE_IMAGE=node:24-alpine
FROM ${BASE_IMAGE}

ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --omit=dev && npm cache clean --force
COPY ./src/ /app/

USER node
CMD ["node", "index.js"]
