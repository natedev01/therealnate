document.addEventListener('DOMContentLoaded', () => {

    const fileInput = document.getElementById('log-files');
    const resultsContainer = document.getElementById('results-container');

    // --- Fő eseményfigyelő ---
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        resultsContainer.innerHTML = `<p>Fájlok beolvasása és elemzése...</p>`;
        processLogFiles(files);
    });

    // --- Logfeldolgozó funkció ---
    async function processLogFiles(files) {
        const reports = {};
        const regex = /\[(.*?)\]\s.*?\[SeeMTA - Siker\]:.*?\((\d+)\)\s-\s(elvállalás|lezárás)/;

        // Fájlok tartalmának beolvasása
        for (const file of files) {
            const content = await file.text();
            const lines = content.split('\n');

            // Soronkénti feldolgozás
            lines.forEach(line => {
                const match = line.match(regex);
                if (match) {
                    const timestamp = new Date(match[1].replace(/-/g, '/')); // Dátum objektummá alakítás
                    const id = match[2];
                    const type = match[3];

                    // Adatstruktúra építése
                    if (!reports[id]) reports[id] = {};
                    if (type === 'elvállalás') reports[id].startTime = timestamp;
                    if (type === 'lezárás') reports[id].endTime = timestamp;
                }
            });
        }
        
        calculateAndDisplayResults(reports);
    }

    // --- Eredményeket kiszámoló és megjelenítő funkció ---
    function calculateAndDisplayResults(reports) {
        const completedReports = [];
        let totalDuration = 0;

        for (const id in reports) {
            const report = reports[id];
            if (report.startTime && report.endTime) {
                const duration = report.endTime - report.startTime; // Milliszekundumban
                totalDuration += duration;
                completedReports.push({
                    id,
                    startTime: report.startTime,
                    endTime: report.endTime,
                    duration
                });
            }
        }
        
        if (completedReports.length === 0) {
            resultsContainer.innerHTML = '<p>Nem található egyetlen lezárt ügy sem a fájlokban.</p>';
            return;
        }

        const averageDuration = totalDuration / completedReports.length;

        let resultsHTML = `
            <div class="summary-box">
                <p>Teljesített ügyek száma: <span class="summary-value">${completedReports.length}</span></p>
                <p>Átlagos ügyintézési idő: <span class="summary-value">${formatDuration(averageDuration)}</span></p>
            </div>
            <div class="table-container glass-effect">
                <div class="table-scroll">
                    <table class="styled-table">
                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Elvállalva</th>
                                <th>Lezárva</th>
                                <th>Időtartam</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${completedReports.map(r => `
                                <tr>
                                    <td>${r.id}</td>
                                    <td>${formatDateTime(r.startTime)}</td>
                                    <td>${formatDateTime(r.endTime)}</td>
                                    <td>${formatDuration(r.duration)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        resultsContainer.innerHTML = resultsHTML;
    }
    function formatDuration(ms) {
        if (ms < 0) ms = 0;
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return [
            hours > 0 ? `${hours}ó` : '',
            minutes > 0 ? `${minutes}p` : '',
            `${seconds}mp`
        ].filter(Boolean).join(' ');
    }

    function formatDateTime(date) {
        return date.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
});
