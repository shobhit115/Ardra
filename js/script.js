// Load Navbar and Footer
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.innerHTML = `
      <div style="display:flex; align-items:center;">
        <span style="font-family:'Orbitron'; font-size:1.5rem; color:var(--accent);">🌍 PlanetMandi</span>
      </div>
      <div>
        <a href="index.html">Home</a>
        <a href="products.html">Buy Land</a>
      </div>
    `;
  }

  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <p>&copy; 2025 PlanetMandi | For demo purposes only - No real land is for sale.</p>
    `;
  }

  // Load Featured Planets (for Landing Page)
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    loadFeaturedPlanets();
  }
});

async function loadFeaturedPlanets() {
  try {
    const response = await fetch('planets.json');
    const planets = await response.json();
    const featured = planets.slice(0, 3);
    const grid = document.getElementById('featured-grid');
    
    grid.innerHTML = featured.map((planet, index) => `
      <div class="planet-card" onclick="goToDetails('${planet.name}')" style="animation-delay: ${index * 0.2}s;">
        <img src="${planet.photo.replace(/\\/g, '/')}" alt="${planet.name}" loading="lazy">
        <div class="planet-card-content">
          <h3>${planet.name}</h3>
          <p>${planet.description.substring(0, 120)}...</p>
          <span class="price">₹${planet.prize.toLocaleString()}</span>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading planets:', error);
  }
}

function goToDetails(name) {
  window.location.href = `details.html?name=${encodeURIComponent(name)}`;
}
