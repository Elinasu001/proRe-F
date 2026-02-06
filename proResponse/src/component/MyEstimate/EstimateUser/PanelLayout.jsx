import React from "react";

const PanelLayout = ({ title, desc, children }) => {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 20, borderBottom: "1px solid #e0e0e0" }}>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {children}
      </div>
    </div>
  );
};

export default PanelLayout;
