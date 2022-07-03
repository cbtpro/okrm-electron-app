const { app, Menu } = require('electron');

exports.createMenu = (mainWindow) => {
  return Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
      {
        click: () => mainWindow.webContents.send('update-counter', 1),
        label: 'Increment',
      },
      {
        click: () => mainWindow.webContents.send('update-counter', -1),
        label: 'Decrement',
      }
      ]
    },
  ]);
};