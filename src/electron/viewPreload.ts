import { ipcRenderer } from "electron";
import { CSSProperties } from "react";

import { InitiateSaveHighlightProps, IPCChannels } from "./types";

window.addEventListener("DOMContentLoaded", () => {
  const buttonPopup = createButtonPopup();
  document.body.prepend(buttonPopup);

  window.addEventListener("mouseup", async () => {
    const selectedText = getSelectionText();
    if (!selectedText.length) {
      buttonPopup.style.display = "none";
      return;
    }

    buttonPopup.addEventListener("click", () =>
      handleButtonClick(selectedText)
    );
    buttonPopup.style.display = "flex";
  });
});

const getSelectionText = () => window.getSelection().toString().trim();

const createButtonPopup = () => {
  const popup = document.createElement("div");

  popup.id = "button-popup";
  popup.innerText = "Save highlight";

  Object.assign(popup.style, popupStyles);

  return popup;
};

const handleButtonClick = (selectedText: string) => {
  ipcRenderer.send(IPCChannels.InitiateSaveHighlight, {
    url: window.location.toString(),
    title: document.title,
    text: selectedText,
  } as InitiateSaveHighlightProps);

  const buttonElement = document.getElementById("button-popup");

  buttonElement.style.display = "none";
  window.getSelection().empty();
};

const popupStyles: CSSProperties = {
  position: "fixed",
  width: `75%`,
  height: `75px`,
  bottom: `10%`,
  left: `50%`,

  display: "none",
  justifyContent: "center",
  alignItems: "center",
  border: "3px solid #a8a8a8",
  borderRadius: "50px",
  fontSize: "18px",
  backgroundColor: "#e3e3e3",

  transform: "translate(-50%, -50%)",
  zIndex: "1000",
  cursor: "pointer",
};
