import React from "react";
import ExportBasicInfo from "../../Common/Export/ExportBasicInfo";
import ExpertDetail from "../../Common/Export/ExportDetail";

import ExpertTabs from "./ExpertTabs";
import ExpertReviewList from "./ExpertReviewList";
import PanelLayout from "./PanelLayout";

const ExpertDetailPanel = ({
  expert,
  activeTab,
  setActiveTab,
  reviews,
  loading,
}) => {
  return (
    <PanelLayout
      title="상세보기"
      desc="전문가님의 정보를 확인해보세요."
    >
      <ExportBasicInfo data={expert} />

      <ExpertTabs
        activeTab={activeTab}
        reviewCount={expert.reviewCount}
        onChange={setActiveTab}
      />

      {activeTab === "detail" ? (
        <ExpertDetail data={expert} />
      ) : (
        <ExpertReviewList reviews={reviews} loading={loading} />
      )}
    </PanelLayout>
  );
};

export default ExpertDetailPanel;
