FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=build /app/target/*.jar ./

RUN rm -f *-plain.jar original-*.jar

EXPOSE 8080

CMD ["sh", "-c", "java -jar *.jar"]