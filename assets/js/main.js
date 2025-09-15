// Megvárjuk, amíg az egész oldal betöltődik, hogy biztosan létezzenek az elemek.
document.addEventListener('DOMContentLoaded', (event) => {

  // Elmentjük egy változóba a gombot az ID-ja alapján
  const gomb = document.getElementById('klikk-gomb');

  // Hozzáadunk egy "click" eseményfigyelőt a gombhoz
  gomb.addEventListener('click', (e) => {
    // Megakadályozzuk, hogy a link alapértelmezett működése (ugrás) lefusson
    e.preventDefault(); 
    
    alert('Fasza, rákattintottál!');
    console.log('A gombra kattintottak!');
    
    // Változtassuk meg a gomb szövegét
    gomb.innerHTML = '<i class="bi bi-check-circle-fill"></i> Siker!';
  });

});
