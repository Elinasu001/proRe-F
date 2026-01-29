import React from 'react';
import * as S from '../../Common/Layout/EstimateLayout.styled.js';
import UserCards from './UserCards.jsx';

const EstimateUser = () => {
	return (
		<>
		<S.LeftContent>
			<UserCards />
		</S.LeftContent>
		<S.RightContent>
			<S.Section>
				내 견적 보내기 (전문가)   
			</S.Section> 
		</S.RightContent>
		</>
	);           
};

export default EstimateUser;
