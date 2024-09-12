FROM node:16-alpine
RUN mkdir -p /app
WORKDIR /app
COPY ./src/ /app/
COPY package*.json /app/
RUN npm install
CMD ["node", "index.js"]

