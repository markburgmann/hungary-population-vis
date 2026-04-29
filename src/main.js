import { Viewer, Cartesian3, Math as CesiumMath } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

// A Cesium nézegető inicializálása
const viewer = new Viewer('cesiumContainer', {
  terrainProvider: null, 
  animation: true,
  timeline: true,
});

// Kamera beállítása Magyarország középpontjára
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(19.50, 47.16, 1000000), // 1000 km magasból
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-90.0), // Függőlegesen lefelé néz
    roll: 0.0
  }
});