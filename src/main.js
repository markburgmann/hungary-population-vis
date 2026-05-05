import { Viewer, Cartesian3, Color, JulianDate, HeightReference, Math as CesiumMath, CallbackProperty, VerticalOrigin, ColorMaterialProperty } from 'cesium';
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
        length: new CallbackProperty((time) => {
        //Óra ellenőrzése
        const date = JulianDate.toDate(time);
        const year = date.getFullYear();

        //Fixalas hogy ne fusson ki a databol (2001-2024)
        const safeYear = Math.min(Math.max(year, 2001), 2024);

        //Kivesszük a népességet a jsonbol (data.json)
        const population = county.popData[safeYear] || 0;

        //Arányosítjuk: 1 fő = 0.15 méter 
        return population * 0.15;
        }, false),
        topRadius: 7000,
        bottomRadius: 7000,
        material: new ColorMaterialProperty(new CallbackProperty((time) => {
          const year = JulianDate.toDate(time).getFullYear();
          const safeYear = Math.min(Math.max(year, 2001), 2024);
          const pop = county.popData[safeYear] || 0;
          
          // Színkódolás a tömeg alapján
          if (pop > 1000000) return Color.ORANGERED.withAlpha(0.8); //Pirosas szín a legnagyobb megyéknél
          if (pop > 500000) return Color.GOLD.withAlpha(0.8); //Sárgás szín a nagyobb megyéknél
          return Color.CYAN.withAlpha(0.7); //Kékes szín a kisebb megyéknél
        }, false)),
        outline: true,
        outlineColor: Color.WHITE,
        heightReference: HeightReference.RELATIVE_TO_GROUND,
      },
        label: {
          text: county.name,
          font: '14px sans-serif',
          style: Color.WHITE,
          outlineWidth: 2,
          outlineColor: Color.BLACK,
          verticalOrigin: VerticalOrigin.BOTTOM,
          pixelOffset: new Cartesian3(0, -20, 0), 
          eyeOffset: new Cartesian3(0, 0, -50000) // Hogy ne takarja el az oszlopot közelről
        }
    });
  });
}
// Kamera beállítása Magyarország középpontjára
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(19.50, 43.0, 650000), 
  orientation: {
    heading: CesiumMath.toRadians(0.0),
    pitch: CesiumMath.toRadians(-55.0), 
    roll: 0.0
  }
});

initVisualization();