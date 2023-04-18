import { Rectangle, IpcRendererEvent } from "electron";

export enum IPCChannels {
  BrowserViewInit = "browserView:init",
  BrowserViewGo = "browserView:go",
  InitiateSaveHighlight = "browserView:initiateSaveHighlight",
  SaveHighlight = "browserView:saveHighlight",
}

export interface BrowserViewAPI {
  initializeView: (rectangle: Rectangle) => void;
  viewGo: (url: string) => void;
  onSaveHighlight: (
    callback: (
      event: IpcRendererEvent,
      highlight: InitiateSaveHighlightProps
    ) => void
  ) => void;
}

export interface InitiateSaveHighlightProps {
  url: string;
  title: string;
  text: string;
}
