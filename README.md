GreenCare – Plant Care Tracker

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
 
