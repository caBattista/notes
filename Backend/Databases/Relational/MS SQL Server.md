# Installation on Linux using Docker

*Note: I had success with this on Debian 12.6*

https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&preserve-view=true&tabs=cli&pivots=cs1-bash

Run the container

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<password>" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2022-latest
```

+ Password needs to be set correctly (with the password requirements) when starting the container. Use Docker logs of the image to debug. 
+ Default username of admin is "sa".