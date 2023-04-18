import { contextBridge, ipcRenderer } from "electron";

import { BrowserViewAPI, IPCChannels } from "./types";

contextBridge.exposeInMainWorld("browserViewAPI", {
  initializeView: (rectangle) =>
    ipcRenderer.send(IPCChannels.BrowserViewInit, rectangle),
  viewGo: (url) => ipcRenderer.send(IPCChannels.BrowserViewGo, url),
  onSaveHighlight: (callback) =>
    ipcRenderer.on(IPCChannels.SaveHighlight, callback),
} as BrowserViewAPI);
