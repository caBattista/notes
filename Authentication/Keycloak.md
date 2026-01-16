---
created: 1970-01-01T01:00
updated: 2025-12-05T16:43
source: https://www.keycloak.org/server/enabletls
---
# Start with Docker

```bash
docker run --name kc -p 8080:8080 \
--network backendnet \
-e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
-e KC_BOOTSTRAP_ADMIN_PASSWORD=changeIt \
quay.io/keycloak/keycloak:26.4.7 \
start-dev
```

## Set up [[TLS]] with self signed certificate ([[Docker]])

#### [[OpenSSL]] (confirmed)

```sh
# Generate a private key
openssl genrsa -out keycloak.pem 2048

# Generate the certificate and include SANs
openssl req -new -x509 -key keycloak.pem -out keycloak-cert.pem -days 3650 \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

# Convert key + certificate into a PKCS12 keystore
openssl pkcs12 -export \
  -in keycloak-cert.pem \
  -inkey keycloak.pem \
  -name keycloak \
  -out keycloak.p12 \
  -passout pass:changeIt

#Create new Container with keystore addedd  
docker run --name kc-https -p 8443:8443 \
  -v /full/path/on/host/keycloak.jks:/opt/keycloak/conf/keycloak.p12:ro \
  -e KC_HTTPS_KEY_STORE_FILE=/opt/keycloak/conf/keycloak.p12 \
  -e KC_HTTPS_KEY_STORE_PASSWORD=changeIt \
  -e KC_HTTPS_KEY_STORE_TYPE=PKCS12 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=changeIt \
  quay.io/keycloak/keycloak:26.4.7 start-dev
```
#### [[Java Keytool]] (confirmed)

```sh
#Create the keystore
keytool -genkeypair \
  -alias keycloak \
  -keyalg RSA \
  -keysize 2048 \
  -keystore keycloak.jks \
  -validity 3650 \
  -storepass changeIt \
  -keypass changeIt \
  -dname "CN=localhost, OU=Dev, O=MyCompany, L=City, S=State, C=DE" \
  -ext "SAN=DNS:localhost" 

#Export certifcate to add it to browser
keytool -export -alias keycloak -keystore keycloak.jks -rfc -file keycloak.crt

#Create new Container with keystore addedd  
docker run --name kc-https -p 8443:8443 \
  -v /full/path/on/host/keycloak.jks:/opt/keycloak/conf/keycloak.jks:ro \
  -e KC_HTTPS_KEY_STORE_FILE=/opt/keycloak/conf/keycloak.jks \
  -e KC_HTTPS_KEY_STORE_PASSWORD=changeIt \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=changeIt \
  quay.io/keycloak/keycloak:26.4.7 start-dev
```