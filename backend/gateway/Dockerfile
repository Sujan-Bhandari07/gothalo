FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/package.json
COPY gateway/package.json ./gateway/package.json

RUN npm ci

COPY shared ./shared
COPY gateway ./gateway

WORKDIR /app/shared
RUN npm run build

WORKDIR /app/gateway
RUN npm run build

EXPOSE 8000
CMD ["node", "dist/server.js"]