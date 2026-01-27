import dummyExpertBasicInfoList from '../Export/dummyExpertBasicInfoList';
import { CardListWrapper } from "./ExportCards.styled.js";
import ExportCardItem from './ExportCardItem';


const ExportCard = ({ data = dummyExpertBasicInfoList, currentPage, itemsPerPage }) => {
    // data 구조: [{ message, data: { list: [...] }, pageInfo, ... }]
    const expertList = data[0]?.data?.list || [];
    const pageInfo = data[0]?.pageInfo || {};
    const page = currentPage || pageInfo.currentPage || 1;
    const perPage = itemsPerPage || pageInfo.boardList || 6;
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = expertList.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <CardListWrapper>
            {currentItems.map((item, idx) => (
                <ExportCardItem key={idx} data={item} />
            ))}
        </CardListWrapper>
    );
};

export default ExportCard;