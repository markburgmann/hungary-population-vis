import { Viewer, Cartesian3, Color, JulianDate, HeightReference, Math as CesiumMath } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

const viewer = new Viewer('cesiumContainer', {
    terrainProvider: null,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    timeline: true,
    animation: true
});

const start = JulianDate.fromIso8601("2001-01-01T00:00:00Z");
const stop = JulianDate.fromIso8601("2024-01-01T00:00:00Z");

viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.multiplier = 700000;
viewer.clock.shouldAnimate = true;
viewer.timeline.zoomTo(start, stop);

async function initVisualization() {
  const response = await fetch('./data.json');
  const counties = await response.json();

  counties.forEach(county => {
    viewer.entities.add({
      name: county.name,
      position: Cartesian3.fromDegrees(county.lon, county.lat),
      cylinder: {
        length: 150000, // fix 150km magasság
        topRadius: 7000,
        bottomRadius: 7000,
        material: Color.CYAN.withAlpha(0.7),
        heightReference: HeightReference.RELATIVE_TO_GROUND
      }
    });
  });
}
// Kamera beállítása Magyarország középpontjára
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(19.50, 47.16, 1000000), // 1000 km magasból
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-90.0), // Függőlegesen lefelé néz
    roll: 0.0
  }
});

initVisualization();