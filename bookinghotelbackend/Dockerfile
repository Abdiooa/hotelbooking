FROM openjdk:21-jdk-slim
EXPOSE 8070
ARG JAR_FILE=target/auth-service-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]