# Etapa de construcción
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Instala Vite
RUN npm install -g vite

# Etapa de ejecución
FROM node:14

WORKDIR /app

COPY --from=build /app /app

EXPOSE 80

CMD ["npm", "run", "dev"]
