import { CardListWrapper } from "./ExportCards.styled.js";
import ExportCardItem from "./ExportCardItem";

const ExportCard = ({ data = [], currentPage, itemsPerPage }) => {
  const page = currentPage || 1;
  const perPage = itemsPerPage || 6;
  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
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
