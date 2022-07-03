export interface IElectronAPI {
  desktop: boolean;
  doAThing: () => void;
  loadPreferences: () => Promise<void>;
  setTitle: (title: string) => void;
  openFile: () => string;
  handleCounter: (callback: (event, value: number) => void) => Electron.IpcRenderer
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}