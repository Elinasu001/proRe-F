import dummyList from './dummyData';
import { CardListWrapper } from "./ExportCards.styled.js";
import ExportCardItem from './ExportCardItem';

const ExportCard = ({ data = dummyList, currentPage = 1, itemsPerPage = 6 }) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <CardListWrapper>
            {currentItems.map((item, idx) => (
                <ExportCardItem key={idx} data={item} />
            ))}
        </CardListWrapper>
    );
};

export default ExportCard;