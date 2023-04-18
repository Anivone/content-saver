import { createRef, FormEvent, useEffect } from "react";
import { Rectangle } from "electron";

export const SideBar = () => {
  const inputRef = createRef<HTMLInputElement>();
  const browserViewRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const browserViewContainer = browserViewRef.current;
    const rectangle: Rectangle = {
      x: browserViewContainer.offsetLeft,
      y: browserViewContainer.offsetTop + 30,
      width: browserViewContainer.offsetWidth,
      height: browserViewContainer.offsetHeight,
    };

    (window as any).browserViewAPI.initializeView(rectangle);
  }, []);

  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    const url = inputRef.current.value.trim();
    if (!url) return;

    (window as any).browserViewAPI.viewGo(url);
  };

  return (
    <aside
      style={{ width: "40%", border: "3px solid black", margin: "60px 0" }}
    >
      <div
        style={{
          width: "100%",
          height: "60px",
          borderBottom: "3px solid black",
        }}
      >
        <form
          style={{
            width: "100%",
            height: "100%",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onSubmit={handleClick}
        >
          <input
            style={{
              width: "75%",
              height: "100%",
              border: "none",
              fontSize: 16,
            }}
            ref={inputRef}
            placeholder={"Input url"}
          />
          <button
            type="submit"
            style={{
              width: "50px",
              height: "30px",
              border: "3px solid black",
              boxShadow: "3px 3px 0px 1px rgba(0,0,0,0.82)",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Go
          </button>
        </form>
      </div>
      <div
        ref={browserViewRef}
        style={{ width: "100%", height: "calc(100% - 60px - 3px)" }}
      ></div>
    </aside>
  );
};
