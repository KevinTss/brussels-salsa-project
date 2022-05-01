import React from 'react';

const ClassCard = ({ data }) => {
  return (
    <div style={{ border: '1px solid #ddd', margin: '10px' }}>
      ID: {data.id}
      <br />
      Level: {data.level}
      <br />
      Initial spots: {data.spots.base}
      <br />
      Time: {data.time}
      <br />
      Type: {data.type}
      <br />
      Frequency: {data.frequency}
      <br />
    </div>
  );
};

export default ClassCard;
