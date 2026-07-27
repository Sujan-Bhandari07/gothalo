FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/package.json
COPY services/agent/package.json ./services/agent/package.json

RUN npm ci

COPY shared ./shared
COPY services/agent ./services/agent

WORKDIR /app/shared
RUN npm run build

WORKDIR /app/services/agent
RUN npm run build

EXPOSE 8002
CMD ["node", "dist/server.js"]