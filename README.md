### NASA Farm Explorers

An interactive React app that visualizes NASA Earth observation data for farms: recent weather, vegetation health, precipitation and true‑color imagery. Built to help farmers and learners explore conditions that affect crop health.

### Why NASA data?

- **Global coverage**: Consistent, science‑grade datasets anywhere on Earth.
- **Agriculture‑relevant variables**: Temperature, humidity, rainfall, and solar radiation for modeling crop health and irrigation.
- **Open access**: Freely available APIs and tiled imagery suitable for education and decision support.

### What data we use

- **NASA POWER Daily (point) API**: Weather and solar variables per day for a lat/lon.
  - Parameters: `T2M` (air temperature at 2 m), `RH2M` (relative humidity), `PRECTOTCORR` (corrected precipitation), `ALLSKY_SFC_SW_DWN` (solar radiation)
  - Implementation: see `src/lib/nasa/power.ts` (`fetchPowerDaily`)
- **NASA GIBS WMTS tiles**: Map layers for vegetation and true‑color imagery.
  - Layers used: `GPM_3IMERGHH_Precipitation_Rate`, `VIIRS_SNPP_NDVI`, `MODIS_Terra_NDVI_16Day`, `MODIS_Terra_CorrectedReflectance_TrueColor`, `VIIRS_SNPP_CorrectedReflectance_TrueColor`
  - Tile URL builder: see `src/lib/nasa/gibs.ts` (`gibsTileUrl`)

### How it works

1. User picks or navigates to a farm location on the interactive map.
2. The app fetches current conditions (temperature, humidity, precipitation) from Open‑Meteo and daily history from NASA POWER for that point.
3. It renders farm dashboards (weather, rainfall, radiation) and health indicators using charts and cards.
4. Background base‑map layers come from NASA GIBS WMTS tiles for NDVI and true‑color context.

### Some Images

  1. <img width="1882" height="837" alt="image" src="https://github.com/user-attachments/assets/f05bf32a-6562-4956-a710-5081ab887546" />
  2. <img width="1908" height="870" alt="image" src="https://github.com/user-attachments/assets/72b26f7e-b954-40ca-aca2-e6fccb086d2e" />
  3. <img width="1880" height="845" alt="image" src="https://github.com/user-attachments/assets/b1f899fb-2ca1-430e-8c3c-cd1a16a5f29e" />
  4. <img width="941" height="850" alt="image" src="https://github.com/user-attachments/assets/0d20df3b-edff-4fce-9e2a-e7c53145a103" />

### Features

- Realtime weather (°C, humidity, precipitation) with periodic refresh
- Farm dashboard with weather, rainfall, humidity, and solar insights
- Interactive map and globe visuals
- NDVI and precipitation layers from NASA GIBS
- Shadcn‑UI components for a modern, accessible UI

### Tech stack

- React + TypeScript (Vite)
- Tailwind CSS + shadcn‑ui (Radix)
- React Router
- TanStack Query for data fetching and caching

### Getting started

Prereqs: Node.js 18+ and npm.

```bash
npm i
npm run dev
```

Visit the dev server URL printed in the terminal.

### Project structure (high level)

- `src/pages` — routes like `Index.tsx`, `FarmApp.tsx`
- `src/components/farm` — farm UI (map, dashboards, stats)
- `src/lib/nasa` — NASA integrations: `power.ts`, `gibs.ts`
- `public/` — static assets

### NASA POWER usage

- Endpoint: `https://power.larc.nasa.gov/api/temporal/daily/point`
- Query includes: `parameters=T2M,RH2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN`, `community=ag`, `latitude`, `longitude`, `start`, `end`, `format=JSON`
- Missing values: POWER uses sentinel values (e.g., -999). We coerce those to `null` in `cleanNum` inside `src/lib/nasa/power.ts`.

### NASA GIBS usage

- WMTS base: `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best`
- Tile matrix: `GoogleMapsCompatible_Level9`
- Builder: `gibsTileUrl(layer, isoDate, z, x, y)` returns a PNG tile URL for a given date and layer.

### Realtime weather usage

- Provider: Open‑Meteo current conditions API
- Endpoint shape: `.../forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation&timezone=auto`
- Units: Temperature in °C; precipitation converted to inches in UI
- Implementation: `src/components/farm/WeatherPanel.tsx`

### Environment & keys

- The current integrations use public, non‑authenticated endpoints for the selected layers and POWER community access. If you add authenticated layers or services, store secrets via environment variables and never commit them.

### Development scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — lint the project

### Attribution

- Imagery and data from NASA Global Imagery Browse Services (GIBS) and NASA POWER Project.
- Cite appropriately if you publish results derived from these datasets. See each service’s documentation for citation guidance.

### Limitations & notes

- NDVI composites can lag by days to weeks; recent dates may be unavailable.
- POWER provides modeled/reanalysis data; local conditions can vary.
- Internet connectivity is required to stream tiles and fetch daily data.

### Contributing

Issues and PRs are welcome. Please include reproduction steps and screenshots for UI changes.

### License

MIT — see `LICENSE` if present in the repository.
