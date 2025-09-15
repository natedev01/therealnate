// Ez a funkció betölti a HTML komponenst a megadott helyre
const loadComponent = (url, elementId) => {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        });
};

// Megvárjuk, amíg az oldal betöltődik, és utána betöltjük a komponenst
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('nav.html', 'navbar-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});
