export class PresetManager {
  static savePreset(name, formData) {
    if (!name) return false;

    let presets = JSON.parse(localStorage.getItem('aiPromptPresets') || '{}');
    presets[name] = formData;
    localStorage.setItem('aiPromptPresets', JSON.stringify(presets));
    return true;
  }

  static loadPreset(name) {
    const presets = JSON.parse(localStorage.getItem('aiPromptPresets') || '{}');
    return presets[name] || null;
  }

  static getAllPresets() {
    return JSON.parse(localStorage.getItem('aiPromptPresets') || '{}');
  }

  static loadPresetsIntoUI() {
    const presetList = document.getElementById('presetList');
    const presets = this.getAllPresets();
    
    presetList.innerHTML = '';
    
    Object.keys(presets).forEach(name => {
      const presetItem = document.createElement('div');
      presetItem.className = 'preset-item';
      presetItem.textContent = name;
      presetItem.onclick = () => this.applyPreset(name);
      presetList.appendChild(presetItem);
    });
  }

  static applyPreset(name) {
    const preset = this.loadPreset(name);
    if (preset) {
      document.getElementById('brandName').value = preset.brandName || '';
      document.getElementById('productName').value = preset.productName || '';
      document.getElementById('productElements').value = preset.productElements || '';
      document.getElementById('primaryProduct').value = preset.primaryProduct || '';
      document.getElementById('secondaryElements').value = preset.secondaryElements || '';
      document.getElementById('supportingProps').value = preset.supportingProps || '';
      document.getElementById('theme').value = preset.theme || 'serene';
      document.getElementById('visualMetaphors').value = preset.visualMetaphors || '';
      document.getElementById('cameraSettings').value = preset.cameraSettings || '';
      document.getElementById('lightingSettings').value = preset.lightingSettings || '';
      
      // Update theme selection UI
      document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
        if (card.dataset.theme === preset.theme) {
          card.classList.add('selected');
        }
      });
      
      return true;
    }
    return false;
  }
}