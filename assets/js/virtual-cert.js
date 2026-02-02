// --- Virtual Experience Tile Click ---
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => {
    const closeBtn = tile.querySelector('.close-tile');
    tile.addEventListener('click', () => {
        tile.classList.add('active');
    });
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tile.classList.remove('active');
    });
});

// --- Certifications Toggle ---
const certToggles = document.querySelectorAll('.toggle-cert');
certToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.closest('.cert-category');
        category.classList.toggle('active');
        btn.textContent = category.classList.contains('active') ? '-' : '+';
    });
});
