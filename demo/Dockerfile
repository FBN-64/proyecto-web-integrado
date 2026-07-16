# Usamos una imagen oficial de Java 17
FROM eclipse-temurin:17-jdk-jammy

# Establecemos el directorio de trabajo dentro del servidor
WORKDIR /app

# Copiamos todos los archivos de tu backend al servidor
COPY . .

# Le damos permisos al motor de compilación (Soluciona el "Permission denied")
RUN chmod +x mvnw

# Construimos la aplicación omitiendo los tests
RUN ./mvnw clean package -DskipTests

# Le decimos a Render qué puerto usar
EXPOSE 8080

# Comando final para encender Spring Boot
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]