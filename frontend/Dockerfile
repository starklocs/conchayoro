FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install

RUN npm run build

# Etapa de produção
FROM node:18-alpine AS production-stage

WORKDIR /app

COPY --from=build-stage /app/out /usr/share/nginx/html

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start", "nginx", "-g", "daemon off;"]
