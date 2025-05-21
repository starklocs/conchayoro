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

COPY --from=build-stage /app .

ENV NODE_ENV=production

# Elastic Beanstalk por padrão usa a porta 8080, então vamos forçar o Next a usá-la
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
