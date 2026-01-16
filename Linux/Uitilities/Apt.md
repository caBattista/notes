---
created: 1970-01-01T01:00
updated: 2025-12-05T11:32
---
```sh
# ---------- Update / Upgrade ----------
sudo apt update                   # Update package index
sudo apt upgrade                  # Upgrade all upgradable packages
sudo apt full-upgrade             # Upgrade packages and handle dependencies
sudo apt autoremove               # Remove unused packages

# ---------- Install / Remove ----------
sudo apt install <package>        # Install a package
sudo apt remove <package>         # Remove a package but keep config
sudo apt purge <package>          # Remove a package including config
sudo apt reinstall <package>      # Reinstall a package

# ---------- Search / Info ----------
sudo apt search <package>         # Search for a package
sudo apt show <package>           # Show detailed info about a package
apt list --installed              # List all installed packages
apt list --upgradable             # List packages available for upgrade

# ---------- Manage Repositories ----------
sudo add-apt-repository <repo>    # Add a repository
sudo apt update                   # Update package index after adding repo
sudo apt-key list                 # List trusted repository keys

# ---------- Clean / Cache ----------
sudo apt clean                    # Remove downloaded package files
sudo apt autoclean                # Remove outdated package files
```