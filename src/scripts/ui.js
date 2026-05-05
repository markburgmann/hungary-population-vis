import { JulianDate } from 'cesium';

export function setupUI(viewer, counties) {
    const yearElement = document.querySelector('#display-year');
    const totalElement = document.querySelector('#display-total');

    viewer.clock.onTick.addEventListener((clock) => {
        const date = JulianDate.toDate(clock.currentTime);
        const year = date.getFullYear();
        const safeYear = Math.min(Math.max(year, 2001), 2024);
        
        if (yearElement.textContent !== String(safeYear)) {
            yearElement.textContent = safeYear;
        }

        const totalPop = counties.reduce((sum, county) => sum + (county.popData[safeYear] || 0), 0);
        totalElement.textContent = `Összlakosság: ${totalPop.toLocaleString()} fő`;
    });
}

export function getCountyDescription(county, time) {
    const year = JulianDate.toDate(time).getFullYear();
    const safeYear = Math.min(Math.max(year, 2001), 2024);
    const pop = county.popData[safeYear] || 0;

    return `
        <div class="county-info-box">
            <h3 style="color: #00d2ff; margin: 0 0 10px 0;">${county.name} ${county.name === 'Budapest' ? "" : " vármegye"}</h3>
            <div style="border-top: 1px solid #444; padding-top: 10px;">
                <p><b>Év:</b> ${safeYear}</p>
                <p><b>Lakosság:</b> <span style="font-size: 1.1em;">${pop.toLocaleString()} fő</span></p>
            </div>
        </div>
    `;
}