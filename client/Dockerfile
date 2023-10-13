# Etapa de construcción
FROM node:14 AS build

COPY package*.json ./
RUN npm install

# Instala Vite
RUN npm install -g vite

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
