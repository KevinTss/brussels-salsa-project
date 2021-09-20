import React from 'react';

const ClassCard = ({ data }) => {
  return (
    <div style={{ border: '1px solid #ddd', margin: '10px' }}>
      ID: {data.id}
      <br />
      Level: {data.level}
      <br />
      Initial spots: {data.spots}
      <br />
      Time: {data.time}
      <br />
      Type: {data.type}
      <br />
    </div>
  );
};

export default ClassCard;
