import { useState } from 'react';
import {
    Highlight,
    LogoTitleWrapper,
    MainLine
} from '../Common/Title/Title.styled';
import ExportCards from '../Common/ExportCards/ExportCards';
import Pagination from '../Common/Pagination/Pagination';

const ExportList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalItems = 8; // 더미 데이터 개수
    //const [data, setData] = useState([]); // 실제 데이터로 교체 예정

    //  useEffect(() => {
    //     api함수
    //     .then(res => setData(res.data.data))
    //     .catch(err => setData([]));
    // }, []);


    // 전체 페이지 수 계산
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 페이지 정보 객체 생성
    const pageInfo = {
        startPage: Math.max(1, currentPage - 2),
        endPage: Math.min(totalPages, currentPage + 2),
        totalPage: totalPages
    };

    return <>
        <LogoTitleWrapper>
            <MainLine>
            <Highlight>견적 요청</Highlight>으로
            </MainLine>
            <MainLine>
            원하시는 서비스를 받아보세요!
            </MainLine>
        </LogoTitleWrapper>

        <ExportCards
            // data={data} // 실제 데이터로 교체 
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
        />

        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageInfo={pageInfo}
        />
    </>;
};

export default ExportList;
