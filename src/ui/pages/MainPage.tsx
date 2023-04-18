import React from "react";

import { Header, Main, SideBar } from "../components";

export const MainPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        padding: "0 50px",
      }}
    >
      <div
        id="main-content"
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          marginRight: 25,
        }}
      >
        <Header />
        <hr style={{ margin: "0 10px", borderTop: "3px solid" }} />
        <Main />
      </div>
      <SideBar />
    </div>
  );
};
