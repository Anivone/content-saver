import { app, BrowserWindow, ipcMain, Rectangle, BrowserView } from "electron";
import * as path from "path";

import { InitiateSaveHighlightProps, IPCChannels } from "./types";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  const view = new BrowserView({
    webPreferences: {
      preload: path.join(
        __dirname,
        "..",
        "renderer",
        "view_preload",
        "preload.js"
      ),
    },
  });
  mainWindow.setBrowserView(view);

  ipcMain.on(IPCChannels.BrowserViewInit, (_event, rectangle: Rectangle) => {
    view.webContents.on("did-finish-load", () => {
      view.setBounds(rectangle);
    });
  });

  ipcMain.on(
    IPCChannels.InitiateSaveHighlight,
    (_event, props: InitiateSaveHighlightProps) => {
      mainWindow.webContents.send(IPCChannels.SaveHighlight, props);
    }
  );

  ipcMain.on(IPCChannels.BrowserViewGo, (_event, url: string) => {
    view.webContents.loadURL(url);
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
