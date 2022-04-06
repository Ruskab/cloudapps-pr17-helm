#################################################
# Imagen base para el contenedor de la aplicación
#################################################
FROM node:lts

# Especificamos esta variable para la correcta ejecución de las librerías en modo de producción
ENV NODE_ENV production

# Definimos el directorio de trabajo en /usr/src/app/
WORKDIR /usr/src/app

# Descargamos el script wait-for-it.sh
RUN curl -LJO https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/src/app/wait-for-it.sh

# Copiamos los ficheros de la aplicación
COPY config /usr/src/app/config/
COPY public /usr/src/app/public/
COPY src /usr/src/app/src/
COPY package.json /usr/src/app/

# Instalamos las dependencias que necesita la app
RUN npm install --only=production

# Indica el puerto que expone el contenedor
EXPOSE 3000

# Comando que se ejecuta cuando se arranque el contenedor
CMD ["node", "src/server.js"]