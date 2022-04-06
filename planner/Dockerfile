#################################################
# Imagen base para el contenedor de compilación
#################################################
FROM maven:3.6.3-openjdk-11 as builder

# Define el directorio de trabajo donde ejecutar comandos
WORKDIR /project

# Copia las dependencias del proyecto
COPY pom.xml /project/

# Descarga las dependencias del proyecto
RUN mvn -B verify clean --fail-never

# Copia el código del proyecto
COPY /src /project/src

# Compila proyecto
RUN mvn -B package

#################################################
# Imagen base para el contenedor de la aplicación
#################################################
FROM openjdk:11-jre-slim

# Define el directorio de trabajo donde se encuentra el JAR
WORKDIR /usr/src/app/

# Copia el JAR del contenedor de compilación
COPY --from=builder /project/target/planner.jar /usr/src/app/

# Indica el puerto que expone el contenedor
EXPOSE 8080

# Comando que se ejecuta al hacer docker run
CMD ["java", "-jar", "planner.jar"]