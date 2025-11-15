# ARDRA

## 🌌 Project Overview

#### Goal: Build a static 3-page website where users can "buy" imaginary land on planets, moons, or other celestial bodies.

#### Tech: HTML, CSS, JavaScript (no frameworks).

#### Style: Futuristic, dark theme, glowing neon accents (blue, purple, cyan).

#### Pages:

1. Landing Page – hero banner, tagline, explore button, a few featured planets.

2. Product Listing Page – grid showing all celestial bodies with images, prices, and short descriptions.

3. Product Details Page – info about a selected planet: description, price, fake “Buy Now” button.

# 🗺️ Work Division Roadmap

## 👨‍🚀 Member 1 – UI/UX & Landing Page *(Anish)*

### **Responsibilities**
- Design layout and color theme for all pages.  
- **Build Landing Page:**
  - Hero section with a large background (space/planet image or animated stars).  
  - “Explore the Universe” button → links to product listing.  
   
- Handle **navbar** and **footer** (reusable across all pages).  
- *(Optional)* Add a star animation background using `<canvas>` or CSS.

### **Deliverables**
- `index.html`  
- `style.css` (main design)  
- Common `navbar` / `footer` components  

---

## 🌠 Member 2 – Product Listing Page *(Rohit)*

### **Responsibilities**
- Create a **grid layout** of all planets/moons using cards.  
- Each card should include:
  - Image  
  - Name  
  - Short description  
  - Price  
  - (Other)
- Differrent Sections
- On click → redirect to product details page (pass data using **query string** or **localStorage**).  
- *(Optional)* Add filtering via dropdown → **Planets / Moons / Other Bodies**.

### **Deliverables**
- `products.html`  
- `products.css`
- `products.js` (logic for displaying cards)  

---

## 🪐 Member 3 – Product Details Page *(Anish)*

### **Responsibilities**
- Build layout for a **single product details** page.  
- Display:
  - Planet image  
  - Full description  
  - Price  
  - “Buy Land” button  
- Add a **Back** button → returns to listing page.  
- Include a **fake purchase animation or alert**  
  *(e.g., “Congratulations, your land on Mars is reserved!”)*.  
- Handle data fetch (via **localStorage** or a predefined JS object).

### **Deliverables**
- `details.html`  
- `details.css`
- `details.js`  

---

## ✅ General Notes
- Maintain **consistent design** across all pages (fonts, colors, navbar, footer).  
- Use **HTML, CSS, and JS only** (no frameworks).  
- Store all shared assets (images, icons, etc.) in `/assets/`.  
- Final integration will be tested by combining all three modules.

```css
ARDRA/
│
├── index.html              → Landing page (Anish)
├── products.html           → Product listing page (Rohit)
├── details.html            → Product details page (You)
│
├── /assets/
│   ├── /generated_images/            → Planet & moon images
│   ├── /planet_photos/
│   └── logo.png            → Site logo
│
├── /css/
│   ├── style.css           → Main styling (colors, navbar, footer)
│   ├── landing.css         → Landing page-specific styles
│   ├── products.css        → Product listing-specific styles
│   └── details.css         → Product details-specific styles
│
├── /js/
│   ├── script.js           → Common JS (navbar, footer, utilities)
│   ├── products.js         → For product grid & filtering (Rohit)
│   └── details.js          → For product info loading (You)
│
└── planets.js                 → Shared data file (planet info, prices, etc.)
```

# 🎨 Design Guidelines

---

##  Color Palette(not decided)



```css 
//use this in css file
:root {
  --bg-primary: #222831;
  --bg-secondary: #393E46;
  --accent: #00ADB5;
  --text-light: #EEEEEE;
}
```


| **Purpose**              | **Color**         | **Hex**     | **Notes**                                                                 |
|---------------------------|-------------------|--------------|---------------------------------------------------------------------------|
| Primary Background        | Dark Charcoal     | `#222831`   | Base background for all pages; gives the “space” vibe without being pure black. |
| Secondary Background      | Gunmetal Gray     | `#393E46`   | Use for cards, navbars, and sections to create depth.                     |
| Accent Color              | Neon Cyan         | `#00ADB5`   | Use for buttons, links, highlights, hover states — your signature “PlanetMandi” color. |
| Text / Light Color        | Off White         | `#EEEEEE`   | Main text color; ensures readability on dark backgrounds.                 |

**Color Ratio Rule:**  
Use roughly **70% background**, **20% secondary**, and **10% accent** for a balanced, modern look.

---

## 🧠 Typography

- **Font Family:** `"Poppins"` or `"Inter"` — clean, modern, and readable.  
- **Optional Title Font:** `"Orbitron"` — for headings if you want a sci-fi or futuristic touch.


