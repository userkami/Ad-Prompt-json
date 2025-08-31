import { ThemeManager } from './theme-manager.js';
import { PromptEngine } from './prompt-engine.js';
import { ExportHandler } from './export-handler.js';
import { PresetManager } from './preset-manager.js';
import { UIComponents } from './ui-components.js';

class App {
  constructor() {
    this.themeManager = new ThemeManager();
    this.promptEngine = new PromptEngine(this.themeManager);
    this.currentPrompt = null;
    
    // Wait for DOM to be loaded before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  initialize() {
    this.initializeEventListeners();
    this.themeManager.initializeThemeSelection();
  }

  initializeEventListeners() {
    document.getElementById("generateBtn").addEventListener("click", () => this.generatePrompt());
    document.getElementById("copyBtn").addEventListener("click", () => UIComponents.copyToClipboard());
    document.getElementById("exportJsonBtn").addEventListener("click", () => this.exportAsJson());
    document.getElementById("exportTextBtn").addEventListener("click", () => this.exportAsText());
    document.getElementById("previewToggle").addEventListener("click", () => UIComponents.toggleJsonPreview());
    document.getElementById("savePresetBtn").addEventListener("click", () => this.savePreset());
    
    // Load saved presets
    PresetManager.loadPresetsIntoUI();
  }

  collectFormData() {
    return {
      brandName: document.getElementById('brandName').value.trim(),
      productName: document.getElementById('productName').value.trim(),
      productElements: document.getElementById('productElements').value.split(',').map(s => s.trim()).filter(Boolean),
      primaryProduct: document.getElementById('primaryProduct').value.trim(),
      secondaryElements: document.getElementById('secondaryElements').value.split(',').map(s => s.trim()).filter(Boolean),
      supportingProps: document.getElementById('supportingProps').value.split(',').map(s => s.trim()).filter(Boolean),
      theme: document.getElementById('theme').value,
      visualMetaphors: document.getElementById('visualMetaphors').value.split(',').map(s => s.trim()).filter(Boolean),
      cameraSettings: document.getElementById('cameraSettings').value.trim(),
      lightingSettings: document.getElementById('lightingSettings').value.trim()
    };
  }

  generatePrompt() {
    const formData = this.collectFormData();
    
    if (!formData.brandName || !formData.productName) {
      UIComponents.showMessage("⚠️ Please fill in Brand Name and Product Name.", "error");
      return;
    }

    this.currentPrompt = this.promptEngine.generatePrompt(formData);
    
    const outputElement = document.getElementById('output');
    outputElement.textContent = JSON.stringify(this.currentPrompt, null, 2);

    // Update JSON viewer
    UIComponents.updateJsonViewer(this.currentPrompt);

    document.getElementById('copyBtn').disabled = false;
    document.getElementById('exportJsonBtn').disabled = false;
    document.getElementById('exportTextBtn').disabled = false;
    UIComponents.showMessage("✅ Prompt generated successfully!", "success");
  }

  exportAsJson() {
    if (this.currentPrompt) {
      ExportHandler.exportAsJson(this.currentPrompt);
      UIComponents.showMessage("✅ JSON file exported successfully!");
    }
  }

  exportAsText() {
    if (this.currentPrompt) {
      ExportHandler.exportAsText(this.currentPrompt);
      UIComponents.showMessage("✅ Text file exported successfully!");
    }
  }

  savePreset() {
    const presetName = document.getElementById('presetName').value.trim();
    if (!presetName) {
      UIComponents.showMessage("⚠️ Please enter a preset name", "error");
      return;
    }

    const formData = this.collectFormData();
    if (PresetManager.savePreset(presetName, formData)) {
      PresetManager.loadPresetsIntoUI();
      document.getElementById('presetName').value = '';
      UIComponents.showMessage("✅ Preset saved successfully!");
    } else {
      UIComponents.showMessage("❌ Error saving preset", "error");
    }
  }
}

// Initialize the application
const app = new App();
window.app = app; // Make it globally accessible for debugging