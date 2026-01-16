---
created: 1970-01-01T01:00
updated: 2025-12-05T12:14
---
[[Package manager]] for [[Node.js|Node.js]]
## Commands

```sh
# ---------- Initialize / Project ----------
npm init                         # Initialize a new Node.js project
npm init -y                       # Initialize with default settings
npm init <initializer>            # Use a custom initializer (e.g., npm init react-app)

# ---------- Install / Uninstall Packages ----------
npm install <package>             # Install a package locally
npm install <package> --save      # Add package to dependencies (default behavior)
npm install <package> --save-dev  # Add package to devDependencies
npm uninstall <package>           # Remove a package locally
npm install -g <package>          # Install package globally
npm uninstall -g <package>        # Uninstall package globally

# ---------- Updating Packages ----------
npm update                        # Update all packages in package.json
npm outdated                       # Check outdated packages
npm install <package>@latest       # Update a specific package to latest version

# ---------- Running Scripts ----------
npm run <script>                  # Run a script defined in package.json
npm start                         # Shortcut to run the start script
npm test                          # Run test script
npm stop                          # Run stop script
npm restart                       # Run restart script

# ---------- Info / List ----------
npm list                           # List installed packages locally
npm list -g                        # List globally installed packages
npm list --depth=0                 # List top-level packages only
npm view <package>                 # Show package info from registry
npm info <package>                 # Alias for npm view

# ---------- Cache / Cleanup ----------
npm cache verify                   # Verify npm cache
npm cache clean --force             # Clear npm cache
npm prune                           # Remove extraneous packages

# ---------- Configuration ----------
npm config get <key>               # Get config value
npm config set <key> <value>       # Set config value
npm config list                    # Show all configuration
```