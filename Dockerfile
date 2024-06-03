# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install || true

# Copia el resto de los archivos de la aplicación
COPY . .

# Instala globalmente las herramientas necesarias
RUN npm install -g next
RUN npm install -g ts-node

# Expone el puerto en el que la aplicación estará corriendo
EXPOSE 3006

# Comando para correr la aplicación
CMD ["npm", "start"]


