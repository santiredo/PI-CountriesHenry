# Etapa de construcción
FROM node:14 AS build

# Copiar los archivos de configuración del proyecto (package.json)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente de la aplicación
COPY . .

# Compilar la aplicación (si es necesario)
RUN npm run build

# Etapa de ejecución
FROM node:14

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos de la etapa de construcción (aplicación compilada)
COPY --from=build /app/dist /app

# Exponer el puerto 80 para la aplicación
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["npm", "start"]
