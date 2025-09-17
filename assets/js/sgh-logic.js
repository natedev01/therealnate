document.addEventListener('DOMContentLoaded', () => {

    // A HTML elemek, amikkel dolgozunk
    const fileInput = document.getElementById('log-files');
    const resultsContainer = document.getElementById('results-container');

    // A szöveg, amit keresünk a fájlokban
    const searchTerm = "[SeeMTA - Siker]: Sikeresen lezártad az ügyet!";

    // Eseményfigyelő a fájlválasztóra: ha a felhasználó kiválasztott fájlokat
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;

        // Ha nincsenek fájlok, ne csináljunk semmit
        if (files.length === 0) {
            resultsContainer.innerHTML = '<p>Nem választottál fájlt.</p>';
            return;
        }

        // Visszajelzés a felhasználónak
        resultsContainer.innerHTML = `<p>Feldolgozás... (${files.length} fájl)</p>`;

        let totalSuccessCount = 0;
        let filesProcessed = 0;

        // Végigmegyünk az összes kiválasztott fájlon
        // Fontos: a forEach nem működik a FileList objektumon, ezért konvertáljuk tömbbé
        Array.from(files).forEach(file => {
            
            const reader = new FileReader();

            // Ez a funkció akkor fut le, amikor a fájl beolvasása befejeződött
            reader.onload = (e) => {
                const content = e.target.result;
                
                // A legegyszerűbb számolási trükk: a keresett szöveg mentén feldaraboljuk a tartalmat.
                // A darabok száma eggyel több lesz, mint a találatok száma.
                const countInFile = (content.split(searchTerm).length - 1);
                totalSuccessCount += countInFile;

                filesProcessed++;

                // Ha az összes fájlt feldolgoztuk, kiírjuk a végeredményt
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

            // Elindítjuk a fájl tartalmának beolvasását szövegként
            reader.readAsText(file);
        });
    });
});
