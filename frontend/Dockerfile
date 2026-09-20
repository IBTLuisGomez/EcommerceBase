# Utilizar una imagen ligera de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código (el volumen de docker-compose sobrescribirá esto en ejecución para el hot-reload)
COPY . .

# Exponer el puerto por defecto de Vite
EXPOSE 5173

# Iniciar el servidor de desarrollo exponiéndolo a la red de Docker
CMD ["npm", "run", "dev", "--", "--host"]