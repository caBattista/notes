# Create Self signed certificate
openssl req -x509 -newkey rsa:2048 \
  -keyout selfsigned.key \
  -out selfsigned.crt \
  -days 365 \
  -nodes \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

# Test if container has internet in network
docker run --rm --network backendnet2 curlimages/curl:latest -L -v https://curl.se
