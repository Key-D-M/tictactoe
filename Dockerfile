# --- STAGE 1: Build the application ---
# Gunakan image Gradle/JDK yang sudah ada untuk kompilasi dan building
FROM gradle:8.8-jdk21-jammy AS build

# Set working directory di dalam container
WORKDIR /app

# Salin file build.gradle dan setting.gradle untuk memungkinkan caching dependensi Gradle
COPY build.gradle settings.gradle ./
COPY gradle/ gradle/

# Unduh dependensi Gradle - ini akan di-cache jika build.gradle tidak berubah
# Jika Anda punya file gradlew.bat atau gradlew, sertakan juga
# COPY gradlew gradlew.bat ./
# RUN chmod +x gradlew
# RUN ./gradlew dependencies

# Salin semua kode sumber aplikasi Anda
COPY src/ src/

# Jalankan Gradle build untuk membuat JAR yang dapat dieksekusi
# --no-daemon digunakan untuk lingkungan CI/CD
RUN gradle build --no-daemon

# --- STAGE 2: Run the application ---
# Gunakan image OpenJDK yang lebih ringan untuk runtime (hanya JRE, tidak perlu JDK penuh)
# Pastikan versi JDK sesuai dengan target Anda (misal: openjdk:21-jre-slim-bullseye)
FROM openjdk:21-jre-slim-bullseye

# Set working directory untuk aplikasi yang sudah di-build
WORKDIR /app

# Salin JAR yang sudah di-build dari stage 'build'
# Ganti tictactoe-0.0.1-SNAPSHOT.jar dengan nama JAR yang sebenarnya dihasilkan oleh Gradle
COPY --from=build /app/build/libs/tictactoe-0.0.1-SNAPSHOT.jar app.jar

# Expose port yang digunakan Spring Boot (default 8080)
EXPOSE 8080

# Perintah untuk menjalankan aplikasi Spring Boot saat container dimulai
ENTRYPOINT ["java", "-jar", "app.jar"]
