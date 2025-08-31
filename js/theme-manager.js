export class ThemeManager {
  constructor() {
    this.themes = {};
    this.loadThemes();
  }

  async loadThemes() {
    try {
      const response = await fetch('./data/themes.json');
      this.themes = await response.json();
    } catch (error) {
      console.error('Failed to load themes:', error);
      // Fallback themes
      this.themes = {
        serene: {
          description: "Photorealistic cinematic sequence set in a pristine serene showroom...",
          style: "photorealistic cinematic, premium minimalism",
          lighting: "controlled, high-end ambient lighting with soft spot highlights; background glows in neutral tones (white/silver/graphite) to emphasize the product shine",
          environment: "minimalist serene showroom with seamless white or metallic surfaces, ambient reflections, and subtle fog or mist to add dimensionality",
          keywords: ["serene", "calm", "tranquil", "natural light", "peaceful", "premium design", "elegant motion", "photorealistic", "cinematic", "no text"]
        },
        energetic: {
          description: "Photorealistic cinematic sequence set in a dynamic energetic space...",
          style: "photorealistic cinematic, high-contrast dramatic",
          lighting: "high-contrast lighting with vibrant colored gels and sharp beams; dramatic spotlights create intense focus",
          environment: "dynamic abstract space with bold geometric shapes and reflective surfaces",
          keywords: ["energetic", "dynamic", "vibrant", "high-contrast", "powerful", "premium design", "elegant motion", "photorealistic", "cinematic", "no text"]
        },
        mysterious: {
          description: "Photorealistic cinematic sequence set in a shadowy mysterious environment...",
          style: "photorealistic cinematic, dark moody atmosphere",
          lighting: "low-key lighting with dramatic shadows and soft highlights; mysterious ambient glow",
          environment: "shadowy atmospheric space with subtle movements and intrigue; foggy or dimly lit environment",
          keywords: ["mysterious", "shadowy", "intrigue", "dark", "moody", "premium design", "elegant motion", "photorealistic", "cinematic", "no text"]
        },
        futuristic: {
          description: "Photorealistic cinematic sequence set in a pristine futuristic showroom...",
          style: "photorealistic cinematic, premium minimalism",
          lighting: "controlled, high-end ambient lighting with soft spot highlights; background glows in neutral tones (white/silver/graphite) to emphasize the product shine",
          environment: "minimalist futuristic showroom with seamless white or metallic surfaces, ambient reflections, and subtle fog or mist to add dimensionality",
          keywords: ["futuristic", "cyberpunk", "neon", "tech", "advanced", "premium design", "elegant motion", "photorealistic", "cinematic", "no text"]
        }
      };
    }
  }

  getTheme(themeName) {
    return this.themes[themeName] || this.themes.serene;
  }

  getAllThemes() {
    return this.themes;
  }

  initializeThemeSelection() {
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      const themeCards = document.querySelectorAll('.theme-card');
      const themeInput = document.getElementById('theme');
      
      if (themeCards.length > 0 && themeInput) {
        themeCards.forEach(card => {
          card.addEventListener('click', () => {
            // Remove selected class from all cards
            themeCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            // Update hidden input
            themeInput.value = card.dataset.theme;
          });
        });
        
        // Set default selection
        const defaultCard = document.querySelector('.theme-card[data-theme="serene"]');
        if (defaultCard) {
          defaultCard.classList.add('selected');
        }
      }
    }, 100);
  }
}