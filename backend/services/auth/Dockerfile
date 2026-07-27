FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./
COPY shared/package.json ./shared/package.json
COPY services/auth/package.json ./services/auth/package.json

RUN npm ci

COPY shared ./shared
COPY services/auth ./services/auth

WORKDIR /app/shared
RUN npm run build

WORKDIR /app/services/auth
RUN npm run build

EXPOSE 8001
CMD ["node", "dist/server.js"]