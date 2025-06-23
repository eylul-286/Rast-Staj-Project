import React from 'react';
import '../styles/Card.css';

const BaseCard = ({ title = "", children }) => {
  return (
    <div className='base-card'>
      <h1>{title}</h1>
  
      {children}
    </div>
  );
};

export default BaseCard;
