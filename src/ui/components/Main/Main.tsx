import { useCallback, useState } from "react";
import { IpcRendererEvent } from "electron";

import { highlightsStore } from "./constants";
import { Highlight } from "./Highlight/types";
import { HighlightCard } from "./Highlight/Highlight";
import { getUniqueObjects } from "../../utils/getUniqueObjects";

export const Main = () => {
  const [highlights, setHighlights] = useState(highlightsStore ?? []);

  const addHighlight = useCallback((highlight: Highlight) => {
    setHighlights((prevHighlights) => {
      const mergedArray = [...prevHighlights, highlight];
      return getUniqueObjects(mergedArray);
    });
  }, []);

  (window as any).browserViewAPI.onSaveHighlight(
    (event: IpcRendererEvent, highlight: Highlight) => {
      addHighlight(highlight);
    }
  );

  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "25px 0",
        overflowY: "auto",
      }}
    >
      {highlights.length ? (
        highlights.map((highlight, index) => (
          <HighlightCard key={index} {...highlight} />
        ))
      ) : (
        <span style={{ fontSize: 32 }}>No highlights yet!</span>
      )}
    </main>
  );
};
