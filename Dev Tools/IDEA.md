---
created: 1970-01-01T01:00
updated: 2026-01-16T12:08
---
# Java Projekt kompilieren mit maven (um es in docker hinzuzufügen)

Maven Reiter > PROJEKTNAME> Life cycle > package

# Java Home
~/.jdks/openjdk-25.0.1/bin

# Java Maven cert
~/.jdks/openjdk-25.0.1/bin/keytool -genkey -alias "javaptscatruststore" -keyalg "RSA" -keystore "/home/shared/notes/javaptscatruststore.jks"
~/.jdks/openjdk-25.0.1/bin/keytool -import -alias "your-certificate" -file "cert.crt" -keystore "/home/shared/notes/javaptscatruststore.jks" -storepass ""

# In IDEA set File | Settings | Build, Execution, Deployment | Build Tools | Maven | Runner
-Djavax.net.ssl.trustStore=/home/shared/notes/javaptscatruststore.jks -Djavax.net.ssl.trustStorePassword=

# Docker build java container
docker build -t oauth2-client:latest .
docker run -p 8081:8081 oauth2-client:latest