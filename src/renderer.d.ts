export interface IElectronAPI {
  desktop: boolean;
  doAThing: () => void;
  loadPreferences: () => Promise<void>;
  setTitle: (title: string) => void;
  openFile: () => string;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}