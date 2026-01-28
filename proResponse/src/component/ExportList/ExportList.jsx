import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Highlight,
    LogoTitleWrapper,
    MainLine
} from '../Common/Title/Title.styled';
import ExportCards from '../Common/ExportCards/ExportCards';
import Pagination from '../Common/Pagination/Pagination';

const ExportList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const experts = location.state?.experts || {}; // API에서 전달된 데이터
    const categoryName = location.state?.categoryName;
    const detailCategoryNo = location.state?.detailCategoryNo;

    //console.log(categoryName);
    //onsole.log(detailCategoryNo);

       useEffect(() => {
        
        if (Object.keys(experts).length === 0) {
            alert("먼저 카테고리 번호를 선택해주세요");
            navigate('/'); // 홈으로 이동
        }
    }, [experts, navigate]);

    const expertInfo = experts.list || []; // 전문가 배열
    const pagination = experts.pageInfo || {};

    // currentPage 초기값을 API에서 가져온 currentPage로 설정
    const [currentPage, setCurrentPage] = useState(pagination.currentPage || 1);

    const itemsPerPage = pagination.boardLimit || 6; // boardLimit 사용

    const totalItems = expertInfo.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageInfo = {
        startPage: pagination.startPage || 1,
        endPage: pagination.endPage || totalPages,
        totalPage: pagination.maxPage || totalPages,
    };

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentData = expertInfo.slice(startIdx, startIdx + itemsPerPage);

    //console.log(expertInfo);
    //console.log(itemsPerPage);

    return (
        <>
            <LogoTitleWrapper>
                <MainLine>
                    <Highlight>견적 요청</Highlight>으로
                </MainLine>
                <MainLine>
                    원하시는 서비스를 받아보세요!
                </MainLine>
            </LogoTitleWrapper>

            <ExportCards
                data={currentData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                categoryName={categoryName}
                detailCategoryNo={detailCategoryNo}
            />

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageInfo={pageInfo}
            />
        </>
    );
};

export default ExportList;
