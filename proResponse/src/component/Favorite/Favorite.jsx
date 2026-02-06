import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Highlight,
    LogoTitleWrapper,
    MainLine
} from '../Common/Title/Title.styled';
import ExportCards from '../Common/ExportCards/ExportCards';
import Pagination from '../Common/Pagination/Pagination';
import { axiosAuth } from '../../api/reqApi';
import { useAuth } from '../../context/AuthContext';

const Favorite = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [likedExperts, setLikedExperts] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);
    const itemsPerPage = 6;

    // auth 상태가 로드될 때까지 대기
    useEffect(() => {
        // localStorage에서 직접 확인 (auth context 로딩 지연 대응)
        const storedToken = localStorage.getItem('accessToken');
        
        if (!storedToken) {
            alert('로그인이 필요합니다.');
            navigate('/auth/loginForm', { replace: true });
            return;
        }
        
        setAuthChecked(true);
    }, [navigate]);

    useEffect(() => {
        if (!authChecked) return;
        fetchLikedExperts(currentPage);
    }, [currentPage, authChecked]);

    const fetchLikedExperts = async (pageNo) => {
        setLoading(true);
        try {
            const response = await axiosAuth.getList(`/api/experts/likes?pageNo=${pageNo}`);
            console.log('찜한 전문가 목록:', response.data);
            
            const expertList = response.data?.list || [];
            const pagination = response.data?.pageInfo || {};

            setLikedExperts(expertList);
            setPageInfo({
                startPage: pagination.startPage || 1,
                endPage: pagination.endPage || 1,
                totalPage: pagination.maxPage || 1
            });
        } catch (error) {
            console.error('찜한 전문가 목록 조회 실패:', error);
            setLikedExperts([]);
        } finally {
            setLoading(false);
        }
    };

    return <>
        <LogoTitleWrapper>
            <MainLine>
                내가 <Highlight>찜한</Highlight> 전문가
            </MainLine>
            <MainLine>
                마음에 드는 전문가에게 견적을 요청해보세요!
            </MainLine>
        </LogoTitleWrapper>

        {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
        ) : likedExperts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                찜한 전문가가 없습니다.
            </div>
        ) : (
            <>
                <ExportCards
                    data={likedExperts}
                    currentPage={1}
                    itemsPerPage={itemsPerPage}
                />

                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageInfo={pageInfo}
                />
            </>
        )}
    </>;
};

export default Favorite;
