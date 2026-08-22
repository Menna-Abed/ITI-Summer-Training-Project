# 🌿 GreenCare – Plant Care Tracker

A beginner-friendly React project for tracking houseplants: add plants, see who
needs water, mark them as watered, and everything is saved in the browser
with `localStorage` — no backend, no database.

---

## 1. Project Structure

```
greencare/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Central state + simple page router
│   ├── data/
│   │   └── defaultPlants.js     # Starter sample plants
│   ├── utils/
│   │   └── plantUtils.js        # Date math / watering status helpers
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PlantCard.jsx
│   │   ├── PlantForm.jsx        # shared by Add Plant & Edit Plant
│   │   ├── SearchBar.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── Stats.jsx
│   │   └── PlantTip.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Plants.jsx
│   │   ├── AddPlant.jsx
│   │   ├── PlantDetails.jsx
│   │   ├── EditPlant.jsx
│   │   └── CareTips.jsx
│   └── styles/
│       ├── index.css            # reset, CSS variables, base type
│       └── style.css            # layout, components, responsive rules
```

## 2. Installation

You need [Node.js](https://nodejs.org) (version 18 or higher) installed.

```bash
cd greencare
npm install
```

## 3. Running the project

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

## 4. How the app is organized (no router library)

Instead of `react-router`, `App.jsx` keeps two small pieces of state:

```js
const [currentPage, setCurrentPage] = useState('dashboard')
const [selectedPlantId, setSelectedPlantId] = useState(null)
```

`currentPage` decides which page component to render (`Dashboard`, `Plants`,
`AddPlant`, `PlantDetails`, `EditPlant`, `CareTips`), and `selectedPlantId`
tells the Details/Edit pages *which* plant to show. Navigating is just
calling `onNavigate('details', plant.id)`, which is passed down as a prop.
This keeps the project dependency-free and easy to follow for beginners.

## 5. Where each React concept shows up

| Concept | Where |
|---|---|
| **Components** | Every file in `components/` and `pages/` |
| **Props** | All data flows down via props, e.g. `<PlantCard plant={plant} onWaterNow={...} />` |
| **`useState`** | `App.jsx` (plants, currentPage), `Plants.jsx` (search/filter), `PlantForm.jsx` (form fields), `Navbar.jsx` (mobile menu open/closed) |
| **`useEffect`** | `App.jsx` saves `plants` to `localStorage` whenever it changes; `Plants.jsx` updates the browser tab title when the filtered list changes |
| **Event handling** | `onClick`, `onChange`, `onSubmit` throughout (buttons, inputs, forms) |
| **Forms & controlled inputs** | `PlantForm.jsx` — every input's `value` comes from state and updates via `onChange` |
| **Conditional rendering** | Empty states (`plants.length === 0 ? ... : ...`), status badges (🔴 vs 🟢), `PlantDetails`/`EditPlant` showing a "not found" message when a plant is missing |
| **`.map()`** | Rendering plant cards (`plants.map(...)`), stats cards, filter buttons, tip cards |
| **`.filter()`** | Search (`Plants.jsx`), category/status filters (`Plants.jsx`), removing a plant (`handleDeletePlant`) |
| **`localStorage`** | `App.jsx` — reads on first load (`useState` initializer), writes on every change (`useEffect`) |

## 6. Component overview

- **Navbar** — top navigation bar with a responsive hamburger menu on mobile.
- **Stats** — the three dashboard summary cards (Total / Need Water / Healthy).
- **SearchBar** — controlled text input for searching plants by name.
- **FilterButtons** — the All / Indoor / Outdoor / Needs Water / Healthy chips.
- **PlantCard** — one plant's card, including the watering "growth bar",
  status badge, and Water Now / View Details buttons.
- **PlantForm** — shared form used by both the Add Plant and Edit Plant
  pages, with simple required-field validation.
- **PlantTip** — a single care-tip card on the Care Tips page.
- **Dashboard** — homepage: hero banner, stats, and the full plant grid.
- **Plants** — "My Plants" page: search + filters + plant grid.
- **AddPlant** — the Add Plant form page.
- **PlantDetails** — full details for one plant, with Water Now, Edit, and
  Delete actions.
- **EditPlant** — the Edit Plant form page (reuses `PlantForm`).
- **CareTips** — four static plant-care tip cards.

## 7. Data model

Each plant object looks like this:

```js
{
  id: 'plant-...',
  name: 'Snake Plant',
  icon: '🌿',
  category: 'Indoor' | 'Outdoor',
  lightRequirement: 'Low' | 'Medium' | 'High',
  wateringFrequency: 14,          // days between waterings
  lastWatered: '2026-08-09',      // YYYY-MM-DD
  notes: 'Very forgiving...',
  favorite: true,
}
```

The **next watering date** and **status** (Healthy / Needs Water) are never
stored — they're calculated on the fly from `lastWatered` and
`wateringFrequency` in `src/utils/plantUtils.js`, so they're always accurate
whenever the page opens.

## 8. Optional features included

- ⭐ Favorite plants (toggle from the plant card)
- 💧 Watering progress ("growth bar" showing how close a plant is to its
  next watering day)
- 📱 Responsive layout with a collapsing mobile navbar

Enjoy — and don't forget to water your plants! 🌱
