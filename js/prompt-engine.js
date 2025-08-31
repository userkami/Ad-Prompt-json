export class PromptEngine {
  constructor(themeManager) {
    this.themeManager = themeManager;
  }

  generatePrompt(formData) {
    const {
      brandName,
      productName,
      productElements,
      primaryProduct,
      secondaryElements,
      supportingProps,
      theme,
      visualMetaphors,
      cameraSettings,
      lightingSettings
    } = formData;

    const selectedTheme = this.themeManager.getTheme(theme);

    // Build elements array
    const elements = [
      `${brandName}-branded crate (matte finish, glowing seams)`,
      primaryProduct || `${productName} main component`,
      ...secondaryElements,
      ...supportingProps,
      "floating platform or display stand for the final product",
      "soft ambient particles and shimmer trails around moving components"
    ];

    // Build product elements string
    const productElementsString = productElements.length > 0 ? productElements.join(", ") : "sleek components with precision engineering";

    // Build description with placeholders
    const description = `Photorealistic cinematic sequence set in a pristine ${theme} showroom. A sealed ${brandName}-branded crate rests center stage, softly illuminated. The crate vibrates gently—then unlocks with a soft *click*. As it opens, a wave of elegant visual energy bursts outward. Inside, ${productName} components begin assembling mid-air with precision and elegance: ${productElementsString}. The entire scene feels like a ritual of innovation and refinement, showcasing the product's essence without using any text.`;

    // Build motion description
    const motion = `crate unlocks with satisfying click, panels fold away smoothly; internal elements lift into the air and assemble mid-air with slow, elegant movement; floating particles add a magical but clean touch`;

    // Build ending description
    const ending = `${productName} is fully assembled and centered on a glowing display base, softly rotating under a spotlight. Camera pulls back as ambient light dims, leaving only the product in focus.`;

    return {
      "description": description,
      "style": selectedTheme.style,
      "camera": cameraSettings || `starts with a slow push-in on the crate, then orbits as panels open; transitions into top-down reveal as products assemble mid-air`,
      "lighting": lightingSettings || selectedTheme.lighting,
      "environment": selectedTheme.environment,
      "elements": elements,
      "motion": motion,
      "ending": ending,
      "text": "none",
      "keywords": [
        brandName,
        productName,
        "crate-opening reveal",
        "floating product parts",
        "premium design",
        "elegant motion",
        ...selectedTheme.keywords.slice(5)
      ]
    };
  }
}