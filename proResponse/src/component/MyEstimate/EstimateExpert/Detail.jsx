
import * as S from '../styles/Detail.styled';

const Detail = ({ data, onClose }) => {
    return (
        <S.Overlay onClick={onClose}>
        <S.Modal onClick={e => e.stopPropagation()}>
        </S.Modal>
        </S.Overlay>
    );
};

export default Detail;