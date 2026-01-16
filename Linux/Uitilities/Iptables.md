---
created: 1970-01-01T01:00
updated: 2025-12-05T11:42
---
## Info

+ All commands need to be executed with sudo.
+ It uses chains. 

```sh
# ---------- View Rules ----------
iptables -L                      # List all rules (default chains)
iptables -L -v -n                # Detailed list with packet counts & numeric IPs
iptables -S                      # Show rules as commands

# ---------- Flush / Delete ----------
iptables -F                      # Flush all rules in all chains
iptables -X                      # Delete all custom chains
iptables -Z                      # Zero packet & byte counters

# ---------- Default Policies ----------
iptables -P INPUT DROP            # Set default INPUT policy to DROP
iptables -P OUTPUT ACCEPT         # Set default OUTPUT policy to ACCEPT
iptables -P FORWARD DROP          # Set default FORWARD policy to DROP

# ---------- Accept / Drop / Reject ----------
iptables -A INPUT -s 1.2.3.4 -j ACCEPT      # Accept packets from IP
iptables -A INPUT -s 5.6.7.8 -j DROP        # Drop packets from IP
iptables -A INPUT -s 9.10.11.12 -j REJECT  # Reject packets from IP (with ICMP)

# ---------- Allow Ports ----------
iptables -A INPUT -p tcp --dport 22 -j ACCEPT   # Allow SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # Allow HTTP
iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # Allow HTTPS

# ---------- Block Ports ----------
iptables -A INPUT -p tcp --dport 23 -j DROP     # Block Telnet

# ---------- Forward / NAT ----------
iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:80
# Forward port 8080 to internal IP 192.168.1.100:80

iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
# Enable NAT for outbound traffic on eth0

# ---------- Allow Established Connections ----------
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
# Accept return traffic for existing connections

# ---------- Logging ----------
iptables -A INPUT -j LOG --log-prefix "IPTables-Dropped: " --log-level 4
# Log dropped packets

# ---------- Save / Restore ----------
iptables-save > /etc/iptables/rules.v4    # Save rules
iptables-restore < /etc/iptables/rules.v4 # Restore rules
```