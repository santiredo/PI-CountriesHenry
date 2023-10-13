# Utiliza una imagen oficial de Node.js como imagen base
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/server  # Cambia a la carpeta 'server'

# Copia los archivos de configuración del proyecto (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente de tu aplicación
COPY . .

# Expone un puerto si tu aplicación lo necesita
EXPOSE 8080

# Comando para ejecutar tu aplicación (asegúrate de que 'start' sea correcto en tu package.json)
CMD ["npm", "start"]
