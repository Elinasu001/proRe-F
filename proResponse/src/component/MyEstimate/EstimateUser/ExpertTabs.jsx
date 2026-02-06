import React from "react";

const ExpertTabs = ({ activeTab, reviewCount, onChange }) => {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
      <button
        onClick={() => onChange("detail")}
        style={{ fontWeight: activeTab === "detail" ? "bold" : "normal" }}
      >
        상세 설명
      </button>
      <button
        onClick={() => onChange("review")}
        style={{ fontWeight: activeTab === "review" ? "bold" : "normal" }}
      >
        리뷰 {reviewCount}
      </button>
    </div>
  );
};

export default ExpertTabs;
