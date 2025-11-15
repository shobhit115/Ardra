document.addEventListener('DOMContentLoaded', async () => {
  // Initialize navbar
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

  // Initialize footer
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <p>&copy; 2025 PlanetMandi | For demo purposes only - No real land is for sale.</p>
    `;
  }

  // Get planet name from URL
  const params = new URLSearchParams(window.location.search);
  const planetName = params.get('name');

  try {
    // Fetch planet data
    const response = await fetch('planets.json');
    const planets = await response.json();
    const planet = planets.find(p => p.name === planetName);

    const container = document.getElementById('details-container');
    
    if (!planet) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 2rem;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">🪐</h1>
          <h2>Planet Not Found</h2>
          <p style="margin: 1rem 0;">The planet you're looking for doesn't exist in our database.</p>
          <button onclick="window.location.href='products.html'" class="btn btn-primary" style="margin-top: 2rem;">
            Browse All Planets
          </button>
        </div>
      `;
      return;
    }

    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-planet');
    if (breadcrumb) {
      breadcrumb.textContent = planet.name;
    }

    // Update page title
    document.title = `${planet.name} - PlanetMandi`;

    // Render planet details
    container.innerHTML = `
      <div class="details-card">
        <div class="image-section">
          <div class="planet-image-container">
            <img src="${planet.photo.replace(/\\/g, '/')}" alt="${planet.name}" loading="lazy">
            <div class="planet-badge">Featured Planet</div>
          </div>
        </div>
        
        <div class="details-info">
          <div>
            <h1>${planet.name}</h1>
            <p class="planet-subtitle">Exoplanet · ${planet.distance_light_year || 'Unknown'} light-years away</p>
          </div>
          
          <p class="description">${planet.description}</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-label">Mass</span>
              <span class="stat-value">${planet.mass || 'N/A'} MJ</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Radius</span>
              <span class="stat-value">${planet.radius || 'N/A'}</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Orbital Period</span>
              <span class="stat-value">${planet.period || 'N/A'} days</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Temperature</span>
              <span class="stat-value">${planet.temperature || 'N/A'} K</span>
            </div>
          </div>
          
          <div class="price-section">
            <span class="price-label">Starting from</span>
            <span class="price-value">₹${planet.prize.toLocaleString()}</span>
          </div>
          
          <div class="button-group">
            <button class="btn btn-primary" onclick="buyLand('${planet.name}', ${planet.prize})">
              🚀 Reserve Your Land
            </button>
            <button class="btn btn-secondary" onclick="window.history.back()">
              ← Back to Planets
            </button>
          </div>
        </div>
      </div>
    `;

    // Show related planets
    showRelatedPlanets(planets, planet.name);

  } catch (error) {
    console.error('Error loading planet data:', error);
    const container = document.getElementById('details-container');
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <h2>Error Loading Planet Data</h2>
        <p>Please try again later.</p>
      </div>
    `;
  }
});

function showRelatedPlanets(planets, currentPlanet) {
  const relatedSection = document.getElementById('related-planets');
  const relatedGrid = relatedSection.querySelector('.related-grid');
  
  // Get 3 random planets excluding current one
  const otherPlanets = planets.filter(p => p.name !== currentPlanet);
  const randomPlanets = otherPlanets.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  if (randomPlanets.length === 0) {
    relatedSection.style.display = 'none';
    return;
  }

  relatedGrid.innerHTML = randomPlanets.map(planet => `
    <a href="details.html?name=${encodeURIComponent(planet.name)}" class="related-card">
      <img src="${planet.photo.replace(/\\/g, '/')}" alt="${planet.name}" loading="lazy">
      <h3>${planet.name}</h3>
      <p>${planet.description.substring(0, 100)}...</p>
    </a>
  `).join('');
}

function buyLand(name, price) {
  showToast(`🎉 Congratulations! Your land on ${name} is reserved!`);
  
  // Optional: Add to cart or redirect to checkout
  setTimeout(() => {
    console.log(`Processing purchase for ${name} at ₹${price.toLocaleString()}`);
    // You can add actual purchase logic here
  }, 1000);
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMessage = toast.querySelector('.toast-message');
  
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}
