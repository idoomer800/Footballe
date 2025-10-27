# Footballe

This repo was converted into a minimal Vite + React app.

How to run:

1. Open a terminal in the project root.
2. Install dependencies: npm install
3. Start dev server: npm run dev

Notes:
- The project uses the existing components under `Components/game` and a small shim API at `src/api/base44Client.js` which reads `Entities/Player.json`. If you want to use a full dataset, replace `Entities/Player.json` with an array of player objects.
- UI primitives used in the original code were recreated under `src/Components/ui` as simple components.
