// Megvárjuk, amíg az oldal teljesen betöltődik
document.addEventListener('DOMContentLoaded', () => {

  // Elmentjük az összes gombot egy listába
  const navButtons = document.querySelectorAll('.nav-button');

  // Végigmegyünk a listán, és mindegyik gombra ráteszünk egy eseményfigyelőt
  navButtons.forEach(button => {
    
    button.addEventListener('click', (event) => {
      // Megakadályozzuk, hogy a link alapértelmezett működése (oldal tetejére ugrás) lefusson
      event.preventDefault(); 
      
      // Kiolvassuk a gombban lévő számot a span elemből
      const buttonNumber = button.querySelector('span').textContent;
      
      console.log(`A(z) ${buttonNumber}. gombra kattintottál!`);
      // Ide jöhet később a logika, pl. oldalváltás, tartalom megjelenítése stb.
    });

  });

});
