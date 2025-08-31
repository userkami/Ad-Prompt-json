export class ExportHandler {
  static exportAsJson(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.downloadBlob(blob, 'ai-video-prompt.json');
  }

  static exportAsText(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
    this.downloadBlob(blob, 'ai-video-prompt.txt');
  }

  static downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}