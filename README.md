# Nepal Map – React

Interactive Nepal map showing provinces and House of Representatives constituencies, with candidate information. Built with React, TypeScript, Vite, and Leaflet.

## Features

- **Country view**: Click a province to zoom in. Provinces are color-coded; hover shows name and population.
- **Province view**: Constituency boundaries with hover tooltips. Click a constituency to see candidate details in the sidebar.
- **Filters**: Province, District, and House of Representative No. dropdowns to jump to a constituency.
- **Election countdown**: Top bar shows countdown to 5 March 2026 (Nepal time).

## Data

- **Map**: GeoJSON in `public/new.geojson`.
- **Candidates**: JSON in `public/candidates.json`, keyed by constituency code (e.g. `KATHMANDU-10`).

The app is set up so you can later switch to **MongoDB**: replace the fetch in `src/api/candidates.ts` (and optionally `src/api/geojson.ts`) with calls to your backend API that reads from MongoDB.

## Run

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. Serve with `npm run preview` to test.

## Adding MongoDB later

1. Add a backend (e.g. Node/Express) with MongoDB driver.
2. Expose endpoints such as `GET /api/candidates` (and optionally `GET /api/geojson`).
3. In `src/api/candidates.ts`, change `fetchCandidates()` to call your API instead of `/candidates.json`.
4. If GeoJSON is stored in MongoDB, add an endpoint and update `src/api/geojson.ts` similarly.
