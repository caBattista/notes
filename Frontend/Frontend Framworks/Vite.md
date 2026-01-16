---
created: 1970-01-01T01:00
updated: 2025-12-05T12:15
---
A [[Module bundler]] for [[JavaScript]] which runs on [[Node.js]]

## Commands

```sh
# ---------- Initialize Project ----------
npm create vite@latest <project-name>   # Create a new Vite project
yarn create vite <project-name>         # Yarn alternative
pnpm create vite <project-name>         # pnpm alternative

# ---------- Project Templates ----------
npm create vite@latest <project-name> -- --template <template>  
# Example: --template react, --template vue, --template vanilla

# ---------- Install Dependencies ----------
cd <project-name>                       # Enter project directory
npm install                              # Install dependencies
yarn                                      # Yarn install
pnpm install                              # pnpm install

# ---------- Run Development Server ----------
npm run dev                              # Start Vite dev server
yarn dev                                  # Yarn dev server
pnpm dev                                  # pnpm dev server

# ---------- Build / Production ----------
npm run build                            # Build for production
yarn build                                # Yarn build
pnpm build                                # pnpm build
npm run preview                           # Preview production build locally

# ---------- Server Options ----------
npm run dev -- --port <port>             # Run dev server on custom port
npm run dev -- --host                     # Make dev server accessible on LAN

# ---------- Plugin / Config ----------
vite.config.js                            # Main Vite configuration file
npm install <vite-plugin>                 # Install a Vite plugin

```