---
created: 1970-01-01T01:00
updated: 2025-12-05T12:03
---
## Create a Shared folder with access rights

```sh
sudo chown -R :shared shared/
sudo chmod g+s ./shared/
sudo chmod -R g+rwx ./shared/
```

## Add Appimage to dock in Gnome

#### Using MenuLibre

```sh
sudo apt install menulibre
```

## Bash

#### Source

[`source`](https://ss64.com/bash/source.html) is a Bash shell built-in command that executes the content of the file passed as an argument _**in the current shell**_. It has a synonym in `.` .

```sh
source venv/bin/activate
. venv/bin/activate
```


# List from Chat GPT

```sh
# ---------- System Information ----------
uname -a                         # Show kernel, hostname, architecture
lsb_release -a                   # Show Debian version details
hostname                          # Show system hostname
uptime                             # Show system uptime and load
df -h                              # Show disk space usage
free -h                            # Show memory usage
top                                # Interactive process monitor
htop                               # Advanced interactive process monitor

# ---------- User Management ----------
whoami                             # Show current logged-in user
id                                 # Show user ID and groups
adduser <username>                  # Add a new user
deluser <username>                  # Delete a user
passwd <username>                   # Change user password
groups <username>                   # Show groups of a user

# ---------- File & Directory Operations ----------
ls -l                               # List files in long format
ls -a                               # List all files (including hidden)
cd <dir>                             # Change directory
pwd                                  # Show current directory
mkdir <dir>                           # Create directory
rm <file>                             # Delete file
rm -r <dir>                           # Delete directory recursively
cp <src> <dest>                       # Copy file or directory
mv <src> <dest>                       # Move or rename file/directory
touch <file>                          # Create empty file
cat <file>                            # Display file content
less <file>                           # View file with scroll
find <dir> -name "<pattern>"          # Search files by pattern

# ---------- Package Management (APT) ----------
sudo apt update                      # Update package index
sudo apt upgrade                     # Upgrade all packages
sudo apt install <package>           # Install package
sudo apt remove <package>            # Remove package
sudo apt purge <package>             # Remove package + config
sudo apt search <package>            # Search for package
sudo apt show <package>              # Show package information
sudo apt autoremove                  # Remove unused packages

# ---------- Network ----------
ip a                                  # Show network interfaces & IPs
ping <host>                            # Ping a host
curl <url>                             # Fetch URL content
wget <url>                             # Download file
netstat -tulnp                         # Show listening ports
ss -tulnp                              # Modern alternative to netstat
ifconfig                               # Show network interfaces (legacy)
dig <domain>                           # DNS lookup
nslookup <domain>                      # DNS lookup

# ---------- Process Management ----------
ps aux                                 # List running processes
top                                     # Interactive process monitor
htop                                    # Advanced interactive process monitor
kill <pid>                              # Kill process by PID
killall <process>                       # Kill process by name
nice -n 10 <cmd>                        # Run command with priority
bg / fg                                 # Background / foreground jobs

# ---------- Disk & Storage ----------
df -h                                   # Disk space usage
du -sh <dir>                             # Directory size
mount                                    # Show mounted filesystems
umount <device>                          # Unmount filesystem
lsblk                                    # List block devices
blkid                                    # Show device UUIDs and types

# ---------- Permissions ----------
chmod 755 <file>                          # Change file permissions
chown user:group <file>                   # Change file owner/group
ls -l                                     # Show file permissions

# ---------- Archive & Compression ----------
tar -cvf archive.tar <files>             # Create tar archive
tar -xvf archive.tar                     # Extract tar archive
tar -czvf archive.tar.gz <files>         # Create gzipped tar archive
tar -xzvf archive.tar.gz                 # Extract gzipped tar archive
zip archive.zip <files>                  # Create zip archive
unzip archive.zip                        # Extract zip archive

# ---------- Searching & Text ----------
grep "pattern" <file>                     # Search text in file
grep -r "pattern" <dir>                   # Recursive search
cat <file> | less                         # Scrollable file viewing
head <file>                               # First 10 lines
tail <file>                               # Last 10 lines
tail -f <file>                            # Monitor file in real time
wc -l <file>                              # Count lines
sort <file>                               # Sort lines
uniq <file>                               # Remove duplicates
cut -d',' -f1 <file>                      # Extract columns

# ---------- System Control ----------
sudo reboot                               # Reboot system
sudo shutdown -h now                       # Shutdown immediately
systemctl status <service>                 # Check service status
systemctl start <service>                  # Start service
systemctl stop <service>                   # Stop service
systemctl restart <service>                # Restart service
journalctl -xe                             # View system logs

```