import React from 'react';

const ClassCard = ({ data }) => {
  return (
    <div style={{ border: '1px solid #ddd', margin: '10px' }}>
      ID: {data.id}
      <br />
      Level: {data.level}
      <br />
      Spots: {data.spots}
      <br />
      Date: {data.date.toDate().toISOString()}
      <br />
    </div>
  );
};

export default ClassCard;
