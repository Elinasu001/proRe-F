import {
    Card,
    ButtonBox,
    Button,
}
from "./ExportCards.styled.js";
import ExportBasicInfo from "../Export/ExportBasicInfo.jsx";


const ExportCardItem = ({ data }) => {


    return (
        <Card>
            <ExportBasicInfo data={data} />
            <ButtonBox>
                <Button>자세히 보기</Button>
                <Button primary>견적 요청</Button>
            </ButtonBox>
        </Card>
    );
};


export default ExportCardItem;

