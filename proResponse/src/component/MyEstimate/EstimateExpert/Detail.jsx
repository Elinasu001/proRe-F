import React, { useState } from 'react';
import * as S from '../styles/Detail.styled';
import { axiosAuth } from '../../../api/reqApi.js';
import { ImageUpload, TextArea } from '../../Common/Input/Input.jsx';

const Detail = ({ data, onClose, onSuccess }) => {
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };

    const handleSubmit = async () => {
        if (!price || !content) {
            alert('견적 금액과 내용을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('requestNo', data.requestNo);
            formData.append('price', price);
            formData.append('content', content);
            
            images.forEach((image) => {
                formData.append('images', image.file);
            });

            await axiosAuth.post('/api/experts/estimate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('견적이 성공적으로 전송되었습니다.');
            onSuccess && onSuccess();
            onClose();
        } catch (error) {
            console.error('견적 전송 실패:', error);
            alert('견적 전송에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Overlay onClick={onClose}>
            <S.Modal onClick={e => e.stopPropagation()}>
                <S.Header>
                    <S.Title>견적 보내기</S.Title>
                    <S.CloseButton onClick={onClose}>×</S.CloseButton>
                </S.Header>

                <S.Content>
                    <S.FormGroup>
                        <S.Label>견적 금액 (원)</S.Label>
                        <S.Input
                            type="number"
                            placeholder="견적 금액을 입력하세요"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </S.FormGroup>

                    <ImageUpload
                        label="사진 첨부"
                        images={images}
                        onChange={handleImagesChange}
                        maxImages={4}
                    />

                    <TextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="견적 요청 시 문의 사항 설명을 작성해주세요"
                        maxLength={1000}
                    />
                </S.Content>

                <S.Footer>
                    <S.CancelButton onClick={onClose}>취소</S.CancelButton>
                    <S.SubmitButton onClick={handleSubmit} disabled={loading}>
                        {loading ? '전송 중...' : '견적 보내기'}
                    </S.SubmitButton>
                </S.Footer>
            </S.Modal>
        </S.Overlay>
    );
};

export default Detail;