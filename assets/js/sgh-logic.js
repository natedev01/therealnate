document.addEventListener('DOMContentLoaded', () => {

    const fileInput = document.getElementById('log-files');
    const resultsContainer = document.getElementById('results-container');

    const searchTerm = "[SeeMTA - Siker]: Sikeresen lezártad az ügyet!";

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;

        if (files.length === 0) {
            resultsContainer.innerHTML = '<p>Nem választottál fájlt.</p>';
            return;
        }

        // Visszajelzés a felhasználónak
        resultsContainer.innerHTML = `<p>Feldolgozás... (${files.length} fájl)</p>`;

        let totalSuccessCount = 0;
        let filesProcessed = 0;

        Array.from(files).forEach(file => {
            
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                
                const countInFile = (content.split(searchTerm).length - 1);
                totalSuccessCount += countInFile;

                filesProcessed++;

                if (filesProcessed === files.length) {
                    resultsContainer.innerHTML = `
                        <p>Összesen talált sikeres ügy:</p>
                        <p class="count">${totalSuccessCount}</p>
                    `;
                }
            };
            
            // Hiba esetén jelezzük
            reader.onerror = () => {
                resultsContainer.innerHTML = `<p>Hiba történt a(z) ${file.name} fájl olvasása közben.</p>`;
            };

            reader.readAsText(file);
        });
    });
});
