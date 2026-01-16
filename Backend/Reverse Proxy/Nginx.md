---
created: 1970-01-01T01:00
updated: 2025-12-12T16:42
source: https://nginx.org/index.html
---
Located in the [[Backend|backend]].

```sh
openssl req -x509 -newkey rsa:2048 \
-keyout selfsigned.key \
-out selfsigned.crt \
-days 365 \
-nodes \
-subj "/CN=localhost" \
-addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

docker run -d \
-p 8444:8444 \
-v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro \
-v $(pwd)/certs:/etc/nginx/certs:ro \
--name nginx-proxy \
--network backendnet \
nginx:latest
```
# TLS (HTTPS)

```nginx
server {
	listen 8444 ssl;
	server_name localhost;
	
	# Self-signed certificate + key
	ssl_certificate /etc/nginx/certs/selfsigned.crt;
	ssl_certificate_key /etc/nginx/certs/selfsigned.key;
	
	# OPTIONAL: Stronger security defaults
	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_ciphers HIGH:!aNULL:!MD5;
}
```
# Load Balancing

```nginx
upstream api_backend {
    least_conn; # Round Robin (default), least_conn, ip_hash
    server backend1:8080 weight=1; #Setting weights is also possible
    server backend2:8080;
}
```