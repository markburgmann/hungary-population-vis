# Hungarian Population Visualizer (CesiumJS)

An interactive 3D data visualization project showcasing the population changes of Hungarian counties from 2001 to 2024, powered by the CesiumJS engine.

## Features

* **Dynamic 3D Columns:** Represents county populations using 3D cylinders with heights proportional to data.
* **Time-Dynamic Visualization:** Data updates in real-time as you navigate the Cesium timeline.
* **Interactive UI Overlay:** Custom info panel appearing on click, providing detailed statistics for each county.
* **Smart Naming Logic:** Automatic "vármegye" (county) suffixing with special handling for the capital, Budapest.
* **Optimized Rendering:** Refined label visibility using pixel offsets and depth test management.

## Project Structure
```text
.
├── src/
│   ├── scripts/
│   │   ├── main.js    # Cesium map initialization and entity management
│   │   └── ui.js      # Interactive overlay and popup logic
│   ├── styles/
│   │   └── style.css  # Styles for the map and custom UI components
│   └── index.html     # Application entry point
├── package.json       # Dependencies and scripts (Vite)
└── README.md
```
