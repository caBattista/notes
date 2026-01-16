---
created: 1970-01-01T01:00
updated: 2025-12-05T11:44
---
UFW is a wrapper around the [[Iptables]]. It adds its rules inside there.

```sh
# ---------- Status ----------
sudo ufw status                   # Show firewall status
sudo ufw status verbose           # Show detailed status with rules

# ---------- Enable / Disable ----------
sudo ufw enable                   # Enable the firewall
sudo ufw disable                  # Disable the firewall

# ---------- Allow / Deny ----------
sudo ufw allow <port>             # Allow traffic on a port (e.g., 22)
sudo ufw allow <port>/tcp         # Allow TCP traffic on a port
sudo ufw allow <port>/udp         # Allow UDP traffic on a port
sudo ufw allow from <IP>          # Allow traffic from a specific IP
sudo ufw deny <port>              # Deny traffic on a port
sudo ufw reject <port>            # Reject traffic on a port with response

# ---------- Delete / Reset ----------
sudo ufw delete allow <port>      # Delete an allow rule
sudo ufw delete deny <port>       # Delete a deny rule
sudo ufw reset                     # Reset ufw to default settings (all rules deleted)

# ---------- Logging ----------
sudo ufw logging on                # Enable logging
sudo ufw logging off               # Disable logging

# ---------- Default Policies ----------
sudo ufw default allow outgoing    # Default policy for outgoing traffic
sudo ufw default deny incoming     # Default policy for incoming traffic
```