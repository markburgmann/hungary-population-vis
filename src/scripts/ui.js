import { JulianDate } from 'cesium';

export function setupUI(viewer, counties) {
    const yearElement = document.querySelector('#display-year');
    const totalElement = document.querySelector('#display-total');

    viewer.clock.onTick.addEventListener((clock) => {
        const date = JulianDate.toDate(clock.currentTime);
        const year = date.getFullYear();
        const safeYear = Math.min(Math.max(year, 2001), 2024);
        
        // Csak akkor frissítjük a DOM-ot, ha tényleg változott az év
        if (yearElement.textContent !== String(safeYear)) {
            yearElement.textContent = safeYear;
        }

        const totalPop = counties.reduce((sum, county) => sum + (county.popData[safeYear] || 0), 0);
        totalElement.textContent = `Összlakosság: ${totalPop.toLocaleString()} fő`;
    });
}