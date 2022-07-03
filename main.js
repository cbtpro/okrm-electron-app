const { app, BrowserWindow, dialog, ipcMain, } = require('electron');
const path = require('path');

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}


async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/preload.js'),
    },
  });

  // ipcMain.on('set-title', (event, title) => {
  //   const webContents = event.sender
  //   const win = BrowserWindow.fromWebContents(webContents)
  //   win.setTitle(title)
  // })

  mainWindow.loadFile('index.html');

  // mainWindow.loadURL('https://github.com');

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle);
  ipcMain.handle('dialog:openFile', handleFileOpen)
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});