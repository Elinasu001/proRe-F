import React from 'react';
import Detail from './Detail';

const ReservationDetail = ({ data, onClose, onSuccess }) => {
  return <Detail data={data} onClose={onClose} onSuccess={onSuccess} />;
};

export default ReservationDetail;
