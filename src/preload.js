const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerHTML = text;
    }
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});


contextBridge.exposeInMainWorld('electronAPI', {
  desktop: true,
  doAThing: () => {
    console.log('doAThing!');
  },
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
});