# Etapa de build
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de produção
FROM node:18-alpine AS production-stage

WORKDIR /app

# COPY --from=build-stage /app ./
COPY --from=build-stage /app/.next/. /usr/share/nginx/html/_next/

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
