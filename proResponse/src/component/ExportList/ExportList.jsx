import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Highlight,
  LogoTitleWrapper,
  MainLine,
} from "../Common/Title/Title.styled";
import ExportCards from "../Common/ExportCards/ExportCards";
import Pagination from "../Common/Pagination/Pagination";
import { axiosAuth, axiosPublic } from "../../api/reqApi";
import { useAuth } from "../../context/AuthContext";

const ExportList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const detailCategoryNo = location.state?.detailCategoryNo;
  const { auth } = useAuth();

  // 전문가 리스트와 페이지네이션 상태
  const [experts, setExperts] = useState({ list: [], pageInfo: {} });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 전문가 리스트 fetch 함수
  const fetchExperts = async (categoryDetailNo, pageNo = 1) => {
    const url = `/api/categories/experts/${categoryDetailNo}?pageNo=${pageNo}`;
    try {
      setLoading(true);
      const response = auth?.accessToken
        ? await axiosAuth.getList(url)
        : await axiosPublic.getList(url);
      setExperts(response.data || response || { list: [], pageInfo: {} });
    } catch (e) {
      alert("전문가 목록을 불러오지 못했습니다.");
      setExperts({ list: [], pageInfo: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!detailCategoryNo) {
      alert("먼저 카테고리 번호를 선택해주세요");
      navigate("/");
      return;
    }
    fetchExperts(detailCategoryNo, currentPage);
    // eslint-disable-next-line
  }, [detailCategoryNo, currentPage, auth?.accessToken]);

  const expertInfo = experts.list || [];
  const pagination = experts.pageInfo || {};
  const itemsPerPage = pagination.boardLimit || 6;
  const totalItems = expertInfo.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageInfo = {
    startPage: pagination.startPage || 1,
    endPage: pagination.endPage || totalPages,
    totalPage: pagination.maxPage || totalPages,
  };
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = expertInfo.slice(startIdx, startIdx + itemsPerPage);

  // 좋아요 클릭 시 리스트를 새로고침하는 핸들러
  const handleLike = () => {
    fetchExperts(detailCategoryNo, currentPage);
  };

  return (
    <>
      <LogoTitleWrapper>
        <MainLine>
          <Highlight>견적 요청</Highlight>으로
        </MainLine>
        <MainLine>원하시는 서비스를 받아보세요!</MainLine>
      </LogoTitleWrapper>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>로딩 중...</div>
      ) : (
        <ExportCards
          data={currentData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          categoryName={categoryName}
          detailCategoryNo={detailCategoryNo}
          onLike={handleLike}
        />
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageInfo={pageInfo}
      />
    </>
  );
};

export default ExportList;
