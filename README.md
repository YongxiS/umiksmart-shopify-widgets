# Umik Smart Shopify Widgets

This project contains standalone widgets for Shopify integration, featuring the Hero component with GSAP animations.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
```

## 📦 Deployment

### GitHub Pages (Automatic)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Set Source to "GitHub Actions"
   - The workflow will automatically deploy on push

3. **Access your widget:**
   Your widget will be available at: `https://YongxiS.github.io/umiksmart-shopify-widgets/`

## 🛍️ Shopify Integration

### Method 1: Direct Iframe Embed

Add this code to any Shopify page where you want the Hero widget:

```html
<div id="umik-hero-widget">
  <iframe 
    src="https://YongxiS.github.io/umiksmart-shopify-widgets/"
    width="100%" 
    height="600px" 
    frameborder="0"
    style="border: none; overflow: hidden;"
    loading="lazy">
  </iframe>
</div>

<style>
#umik-hero-widget {
  width: 100%;
  margin: 0;
  padding: 0;
}

#umik-hero-widget iframe {
  display: block;
  width: 100%;
  min-height: 100vh;
}

@media (max-width: 768px) {
  #umik-hero-widget iframe {
    height: 80vh;
  }
}
</style>
```

### Method 2: Custom Liquid Section

Create a new section file in your theme:

**sections/umik-hero.liquid:**
```liquid
<div class="umik-hero-section">
  <iframe 
    src="https://YongxiS.github.io/umiksmart-shopify-widgets/"
    width="100%" 
    height="{{ section.settings.widget_height | default: 600 }}px"
    frameborder="0"
    loading="lazy">
  </iframe>
</div>

<style>
.umik-hero-section {
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.umik-hero-section iframe {
  display: block;
  width: 100%;
}
</style>

{% schema %}
{
  "name": "Umik Hero Widget",
  "settings": [
    {
      "type": "number",
      "id": "widget_height",
      "label": "Widget Height (px)",
      "default": 600
    }
  ],
  "presets": [
    {
      "name": "Umik Hero Widget"
    }
  ]
}
{% endschema %}
```

## 🎨 Features

- **Responsive Design:** Works on all devices
- **GSAP Animations:** Smooth scroll-triggered animations
- **Performance Optimized:** Lazy loading and optimized assets
- **Easy Integration:** Simple iframe embed for Shopify
- **No Theme Conflicts:** Completely isolated from theme styles

## 🛠️ Technical Details

- **Framework:** React 18 + Vite
- **Animations:** GSAP with ScrollTrigger
- **Styling:** Pure CSS with CSS Custom Properties
- **Assets:** CDN-hosted fonts and images
- **Deployment:** GitHub Pages with automated CI/CD

## 📝 Customization

To modify the widget:

1. Edit `src/components/Hero.jsx` for component logic
2. Edit `src/index.css` for styling
3. Run `npm run build` to generate production files
4. Push changes to trigger automatic deployment

## 🔧 Configuration

Update `vite.config.js` base path to match your repository name:

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🤝 Support

For issues or questions about integration, please check the documentation or create an issue in the repository.
