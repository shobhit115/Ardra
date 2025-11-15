let allPlanets = [];
let activeTags = new Set();
let currentSort = 'name';
let currentView = 'grid';

document.addEventListener('DOMContentLoaded', async () => {
  // Navbar
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

  // Footer
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <p>&copy; 2025 PlanetMandi | For demo purposes only - No real land is for sale.</p>
    `;
  }

  // Load planets
  const response = await fetch('planets.json');
  allPlanets = await response.json();
  
  // Extract unique tags
  const allTags = new Set();
  allPlanets.forEach(planet => {
    if (planet.tags) {
      planet.tags.forEach(tag => allTags.add(tag));
    }
  });

  // Create tag filter chips
  const tagFiltersContainer = document.getElementById('tag-filters');
  allTags.forEach(tag => {
    const chip = document.createElement('div');
    chip.className = 'tag-chip';
    chip.textContent = tag;
    chip.onclick = () => toggleTag(tag, chip);
    tagFiltersContainer.appendChild(chip);
  });

  // Sort listener
  document.getElementById('sort').addEventListener('change', (e) => {
    currentSort = e.target.value;
    displayPlanets();
  });

  // View toggle
  document.getElementById('grid-view').addEventListener('click', () => {
    currentView = 'grid';
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view').classList.remove('active');
    displayPlanets();
  });

  document.getElementById('list-view').addEventListener('click', () => {
    currentView = 'list';
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
    displayPlanets();
  });

  displayPlanets();
});

function toggleTag(tag, chipElement) {
  if (activeTags.has(tag)) {
    activeTags.delete(tag);
    chipElement.classList.remove('active');
  } else {
    activeTags.add(tag);
    chipElement.classList.add('active');
  }
  displayPlanets();
}

function displayPlanets() {
  let filtered = allPlanets;

  // Filter by tags
  if (activeTags.size > 0) {
    filtered = filtered.filter(planet => {
      if (!planet.tags) return false;
      return Array.from(activeTags).every(tag => planet.tags.includes(tag));
    });
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch(currentSort) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.prize - b.prize;
      case 'price-high':
        return b.prize - a.prize;
      case 'distance':
        return (a.distance_light_year || 0) - (b.distance_light_year || 0);
      default:
        return 0;
    }
  });

  // Update results count
  document.getElementById('results-count').textContent = 
    `Showing ${filtered.length} of ${allPlanets.length} celestial bodies`;

  // Display
  const grid = document.getElementById('products-grid');
  grid.className = currentView === 'grid' ? 'grid-layout' : 'list-layout';
  
  grid.innerHTML = filtered.map(planet => `
    <div class="planet-card" onclick="goToDetails('${planet.name}')">
      <img src="${planet.photo.replace(/\\/g, '/')}" alt="${planet.name}" loading="lazy">
      <h3>${planet.name}</h3>
      <div class="planet-info">
        <div class="info-item">
          <span>Distance:</span>
          <strong>${planet.distance_light_year || 'N/A'} LY</strong>
        </div>
        <div class="info-item">
          <span>Period:</span>
          <strong>${planet.period ? planet.period.toFixed(2) : 'N/A'} days</strong>
        </div>
        <div class="info-item">
          <span>Temperature:</span>
          <strong>${planet.temperature || 'N/A'} K</strong>
        </div>
      </div>
      <p>${planet.description}</p>
      <div class="planet-tags">
        ${planet.tags ? planet.tags.map(tag => `<span class="planet-tag">${tag}</span>`).join('') : ''}
      </div>
      <span class="price">₹${planet.prize.toLocaleString()}</span>
    </div>
  `).join('');
}

function goToDetails(name) {
  window.location.href = `details.html?name=${encodeURIComponent(name)}`;
}
