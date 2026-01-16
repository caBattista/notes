# Docker

### Get logs of docker
docker logs my_container

### Docker image exportieren und laden
docker save -o myimage.tar myapp:latest
docker load -i myimage.tar

### Get into container
docker exec -it container_name_or_id /bin/bash


## Block internet to user traffic
Use DOCKER-USER Chain
Docker runs all user-defined rules in the DOCKER-USER chain before Docker’s own rules. 
That’s perfect for restricting containers.

#### Block all containers from internet access
sudo iptables -I DOCKER-USER -s 172.17.0.0/16 -j DROP
#### To remove
sudo iptables -D DOCKER-USER -s 172.17.0.0/16 -j DROP

#### Allow container → host before the DROP
sudo iptables -I DOCKER-USER -s 172.17.0.0/16 -d 172.17.0.1 -j ACCEPT

#### To test
docker run --rm curlimages/curl:8.17.0 -L -v http://wasseralfinger.de/ 


sudo iptables-save > ./rules.v4

sudo iptables-restore < file-with-iptables-rules.txt

# Java projekt kompilieren mit maven (um es in docker hinzuzufügen)

Maven Reiter > <Projektname> > Lifecycle > package

https://www.keycloak.org/getting-started/getting-started-docker

docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.4.7 start-dev

ldaps://vsrv-dc01.pts.local:389

## Realm exportieren und importieren
https://www.keycloak.org/server/importExport

+ Oder gui benutzen 
    + Realm settings > Action > Partial Export
    + Realm settings > Action > Partial Import
    + Manage Realms > Create Realm > Resource file

## Einrichtung Realm mit PKCE und LDAP-Federation

### Realm anlegen

### User anlegen

### Client anlegen

+ Capability config
    + Name
    + Standard flow: true
    + Direct access grants: true
    + PKCE Method: S256
+ Login settings
    + Valid redirect URIs: http:localhost:5173/*
    + Web origin: http:localhost:5173

Linux Weißheiten

## Kernel-Module auf RED-HAT 9.3
- Wenn im Secure-Boot befindend: müssen Kernel Module Keys/Signaturen im Betriebssystem registriert werden
- Secure boot wird im BIOS eingeschaltet und deaktiviert (nicht im OS) als workaround ("mokutil --sb-state" zum checken ob secure boot läuft)
- Wenn man versucht ein Kernelmodul zu installieren mit modprobe muss vorher mit "depmod" die dependancy hergestellt werden
	das hilft wenn "modprobe" das Modul nicht findet

- Um in readhat pakete mit yum zu installieren muss es regestriert sein

##SSH Root-User 
Damit er sich per SSH verbinden kann
muss in der sshd_config ein eintrag gesetzt werden

# Linux ##############################################################################################################

### Debian install (Non netinstall)

Hier die DVD runterladen (Sie enthält mehr Pakete als der Netinstaller)
https://www.debian.org/distrib/

### Stick erstellen mit Rufus

- DD modus auswählen.
- Device: Select the drive letter assigned to your USB flash drive
- Boot selection: Select the downloaded Debian Linux ISO
- Persistent partition size: 0 (No persistence)
- Partition scheme: MBR
- Target system: BIOS or UEFI
- Volume label: debian
- File system: Fat32 (Default)
- Cluster size: 4096 bytes (Default)

Wechseln von GUI zu Terminal u. U. bei Installation
- CTRL + ALT + f1
- CTRL + ALT + f2

### User zu Admin machen
"User ist nicht in sudoers Datei"

Als root ausführen:
> usermod -aG sudo [username]
Danach Rechner neustarten

### Neuen User anlegen
> sudo adduser user_name

### Passwort ändern
> sudo passwd USER

### Schauen welche User angemeldet sind und diese abmelden
> loginctl list-sessions
> loginctl terminate-session TARGET_SESSION_ID

!Achtung! wenn ein user sudo rechte hat kann er damit auch das Passwort des Roots ändern

### Shared Folder anlegen ##############################################################################################################
https://askubuntu.com/questions/313089/how-can-i-share-a-directory-with-an-another-user

> sudo mkdir shared
> sudo addgroup shared
> sudo chown :shared /home/shared
> sudo adduser jonas shared
> sudo chmod 2770 /home/Shared

### Zertifikate installieren
Zertifikat des Vertauenswürdigen Stammzertifizierungsstelle aus dem Zertifikatsspeicher exportieren (DER)
Auf den neuen Rechner übertragen
Mit openssl umwandeln in crt
> openssl x509 -inform DER -in certificate.cer -out certificate.crt
https://stackoverflow.com/questions/642284/do-i-need-to-convert-cer-to-crt-for-apache-ssl-certificates-if-so-how

In Ordner ablegen
> /usr/local/share/ca-certificates/my-custom-ca

als root ausführen (--fresh)
> update-ca-certificates 

https://serverfault.com/questions/1093511/apt-get-update-failing-because-of-certificate-validation
https://grumpytechie.net/2020/02/25/adding-custom-root-ca-certificates-to-debian/

Bei firefox muss es so installiert werden
https://www.microfocus.com/documentation/visual-cobol/vc80/CSUNIX/index.html?t=BKCJCJTCERS008.html

### Paketquellen hinzufügen ##############################################################################################################

Über Synaptic-Paketverwaltung geht es so nachdem an das Zertifikat installiert hat (oder freies internet hat)

In KDE hatte ich es ohne Erfolg so probiert:

https://wiki.debianforum.de/Sources.list
Es sollte ebenfalls https verwendet werden statt http (hat zu Problemen geführt)
Zertifikate müssen installiert sein, damit Pakete installiert werden können

Um es mit dem normalen editor zu öffnen
> open [Pfad zur Textdatei] oder
> gnome-text-editor [Pfad zur Textdatei]
> apt edit-sources

deb http://deb.debian.org/debian/ trixie main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security/ trixie-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ trixie-updates main contrib non-free non-free-firmware

### Nvidia Treiber installieren ##############################################################################################################

Secure-Boot aus schalten im BIOS

sudo grub-mkconfig -o /boot/grub/grub.cfg -> grub nicht grub2

Wechseln von GUI zu Terminal u. U. bei Installation
- CTRL + ALT + f1
- CTRL + ALT + f2
- CTRL + ALT + f...

gdm ist der gnome service denn man abschalten muss gnome

// Diese anleitung befolgen hat funktionier auf debian 12.
https://docs.kinetica.com/7.1/install/nvidia_deb/

### Sophos installiern
​
Endpoint Protection - Sophos Central Admin
Installations Skript anfordern aus Oberfälche
Curl installieren
Installationsskript ausführen

### XRDP ##############################################################################################################

Mit XRDP kann man per Windows-Remote-Desktop auf den Linux rechner zugreifen.

Hier noch die Sleep Targets abschalten sonst geht er nach ca. 15min wieder aus.
> systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target

Oder 
Create /etc/systemd/sleep.conf.d/nosuspend.conf with the contents:

[Sleep]
AllowSuspend=no
AllowHibernation=no
AllowSuspendThenHibernate=no
AllowHybridSleep=no

> systemctl daemon-reload

https://www.reddit.com/r/Ubuntu/comments/1ceun0e/xrdp_extremely_slow/

# Firewall ##############################################################################################################

https://www.freedesktop.org/software/systemd/man/latest/systemd-sleep.conf.html.

> sudo ufw allow 3389/tcp
> sudo ufw allow out 3389/tcp
> sudo ufw allow out 80
> sudo ufw allow out 443
> sudo ufw default deny outgoing
> sudo ufw status verbose
> sudo ufw reload
> sudo ufw enable

> sudo iftop -P

# Applikationen ##############################################################################################################

## Docker
https://docs.docker.com/engine/install/debian/
Die leute noch zu gruppe hinzufügen
https://www.hostinger.com/tutorials/how-to-fix-docker-permission-denied-error?utm_campaign=Generic-Tutorials-DSA-t1|NT:Se|Lang:EN|LO:DE&utm_medium=ppc&gad_source=1&gad_campaignid=16184995375&gclid=EAIaIQobChMIgc63woqSkQMVG4uDBx3tvQDZEAAYASAAEgI0VvD_BwE
https://docs.docker.com/engine/install/linux-postinstall/#:~:text=If%20you%20don%27t%20want,members%20of%20the%20docker%20group.
https://docs.docker.com/get-started/docker_cheatsheet.pdf


## Python

### Virtuelle Umgebungen
https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/

Python Virtual Environment erstellen mit
> python3 -m venv <envname> oder env
Erstellt einen Ordner mit der neuen Virtuellen Umgebung

In diesem Ordner ist ein activierungs skript
> source env/bin/activate

Zum deaktivieren
> deactivate

## pgAdmin4

https://www.pgadmin.org/download/pgadmin-4-apt/
 
## GPT4All

Beim installieren kann man auch das http(s) herausnehemen

Von GPT4all sind die Modelle hier gespeichert
> /home/<user>/.local/share/nomic.ai/GPT4All: Default path used by the Desktop UI of GPT4All.
> /home/<user>/.cache/gpt4all: Default path used by gpt4all's Python library that's installed via pip.

https://github.com/nomic-ai/gpt4all/issues/1235

Zuhause habe ich es auch mit gpt4all und langchain gemacht.
Anmelden über RDP geht nicht.

### UI für GPT4All
https://github.com/ParisNeo/lollms-webui
Hat keine Authentifizierung

## Ollama

### Installation

einfach den befehl hier ausführen
curl -fsSL https://ollama.com/install.sh | sh
https://ollama.com/download/linux

Und dan Ollama run llama3.1 lädt es herunter und führt es aus

Ollama nutzt automatisch alle GPUs. Man kann mehrere GPUs nutzen.

 --verbose um token pro sekunde usw zu sehen

### Open WebUI

Kann mit pip oder einfach das Git repo installieren mit node js usw
RAG fuktioniert mit # zum wählen der dokumente

Mit Apache 2 kann ein als Proxy Server kann ein SSL Zertifikat hinzugefügt werden

#### This disables:
preinstall
install
postinstall
prepublish
prepare
ANY scripts run automatically during install
⚠️ This does not disable manually-run scripts (npm run build, etc.) — only automatic lifecycle scripts.

> npm config set ignore-scripts true
