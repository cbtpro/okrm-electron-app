export interface IElectronAPI {
  desktop: boolean;
  doAThing: () => void;
  loadPreferences: () => Promise<void>;
  setTitle: (title: string) => void;
  openFile: () => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}