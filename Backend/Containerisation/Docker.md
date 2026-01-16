---
created: 1970-01-01T01:00
updated: 2026-01-16T11:57
source: https://docs.docker.com/engine/install/debian/
---
# Set up
#### ⚙️ Docker service

```sh
sudo systemctl status docker            # Check docker service
sudo systemctl start docker             # Start docker service
sudo systemctl stop docker              # Stop docker service
```
### 👥 Add user to docker group

```sh
#This so that you do not have to switch to root to run docker commands
sudo usermod -aG docker USERNAME # Add user to group
newgrp docker # Go into that user and run this to add the group
```

## 🔥🧱 Firewall

Docker manages it's own firewall rules by default inside [[Iptables]].
## Block internet to user traffic
Use DOCKER-USER Chain. Docker runs all user-defined rules in the DOCKER-USER chain before Docker’s own rules. That’s perfect for restricting containers.
#### Block all containers from internet access

```sh
sudo iptables -I DOCKER-USER -s 172.17.0.0/16 -j DROP
```
#### To remove

```sh
sudo iptables -D DOCKER-USER -s 172.17.0.0/16 -j DROP
```
#### Allow container → host before the DROP

```sh
sudo iptables -I DOCKER-USER -s 172.17.0.0/16 -d 172.17.0.1 -j ACCEPT
```
#### To test with curl
```sh
docker run --rm curlimages/curl:8.17.0 -L -v http://wasseralfinger.de/ 
```
## Usage

## 📌 General

```sh
docker --help
docker info # Display system-wide information
docker container stats # Shows stats of running containers
```

## 📦 Containers

```sh
#Run
docker run IMAGE
docker run -it IMAGE /bin/bash     # Interactive shell
docker run -d IMAGE                # Run in background
docker run -p 8080:80 IMAGE        # Port mapping host:container
docker run -v host_dir:container_dir IMAGE   # Mount volume

#List
docker ps                          # Running containers
docker ps -a                       # All containers

#Stop / Start / Restart
docker stop CONTAINER
docker stop $(docker ps -aq)        # Stop all containers
docker start CONTAINER
docker start $(docker ps -aq)       # Start all containers
docker restart CONTAINER
docker restart $(docker ps -aq)     # restart all containers

#Remove
docker rm CONTAINER
docker rm -f CONTAINER             # Force remove running container
docker rm $(docker ps -aq)         # Remove all containers
```
## 🧱 Images

```sh
#Pull / Build
docker pull IMAGE
docker build -t IMAGE:tag . # Build image from Dockerfile

#List
docker images

#Remove
docker rmi IMAGE
docker rmi $(docker images -q) # Remove all images

#Save / Load
docker save IMAGE > image.tar
docker load < image.tar
```
## 📁Volumes

```sh
#Create / Run
docker volume create MYVOL
docker run -v MYVOL:/data IMAGE            # Use volume

#List / Inspect
docker volume ls
docker volume inspect MYVOL

#Remove
docker volume rm myvol
docker volume prune                        # Remove unused volumes
```
## ▶️ Exec inside container (Console inside container)

```sh
docker exec CONTAINER ls
docker exec -it CONTAINER /bin/bash              # Interactive shell
docker exec -it --user root CONTAINER /bin/bash  # As spec. user
```
## 🌐 Networks

```sh
docker network ls
docker network create mynet
docker network rm mynet
docker network connect mynet CONTAINER
docker network disconnect mynet CONTAINER
```
## 🔧 Inspect & Logs

```sh
docker logs CONTAINER
docker logs -f CONTAINER
docker inspect CONTAINER_OR_IMAGE
docker stats
```
## 🧹 Cleanup

```sh
docker system prune
docker system prune -a                     # Aggressive cleanup
```
## 🐙 Docker Compose

```sh
docker compose up
docker compose up -d                       # Detached
docker compose down
docker compose up --build                  # Rebuild
docker compose build
docker compose logs -f

docker compose up -d && docker compose logs --follow # Start and follow logs
```