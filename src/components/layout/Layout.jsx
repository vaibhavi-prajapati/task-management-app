import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <div class="main-content">
        <Header />
        <div className="container">{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
