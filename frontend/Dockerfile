# Etapa de build
FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build + export
RUN npm run build && npm run export

# Etapa de produção com NGINX
FROM nginx:alpine AS production-stage

# Copia arquivos exportados para o root do NGINX
COPY --from=build-stage /app/out /usr/share/nginx/html

# Expõe a porta padrão do NGINX
EXPOSE 80

# Comando para rodar o NGINX em foreground
CMD ["nginx", "-g", "daemon off;"]
