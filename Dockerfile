# Etapa 1: Construcción
FROM node:22 AS build
WORKDIR /app

# Copiar archivos de configuración de npm y el resto de la aplicación
COPY package*.json ./
RUN npm install

# Copiar el resto del código de la aplicación y construir la app de producción
COPY . .
RUN npm run build --prod

# Etapa 2: Servidor web
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción de Angular al directorio donde Nginx los servirá
COPY --from=build /app/dist/test-davivienda-frontend/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]