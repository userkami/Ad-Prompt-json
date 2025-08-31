export class UIComponents {
  static showMessage(message, type = "success") {
    const statusDiv = document.getElementById("statusMessage");
    if (statusDiv) {
      statusDiv.textContent = message;
      statusDiv.className = type === "error" ? "error" : "status";
    }
  }

  static updateJsonViewer(obj) {
    const viewer = document.getElementById('jsonViewer');
    if (viewer && viewer.classList.contains('expanded')) {
      viewer.innerHTML = '<pre>' + JSON.stringify(obj, null, 2) + '</pre>';
    }
  }

  static toggleJsonPreview() {
    const viewer = document.getElementById('jsonViewer');
    if (viewer) {
      viewer.classList.toggle('expanded');
      
      if (viewer.classList.contains('expanded')) {
        const outputText = document.getElementById('output')?.textContent;
        if (outputText && outputText !== '// Your prompt will appear here...') {
          try {
            const jsonObj = JSON.parse(outputText);
            viewer.innerHTML = '<pre>' + JSON.stringify(jsonObj, null, 2) + '</pre>';
          } catch (e) {
            viewer.innerHTML = '<p>Invalid JSON format</p>';
          }
        }
      }
    }
  }

  static copyToClipboard() {
    const outputText = document.getElementById('output')?.textContent;
    if (outputText) {
      navigator.clipboard.writeText(outputText)
        .then(() => {
          this.showMessage("✅ Prompt copied to clipboard!");
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
          this.showMessage("❌ Error copying text. Please manually select and copy.", "error");
        });
    }
  }
}