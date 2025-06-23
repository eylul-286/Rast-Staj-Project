import React from 'react';

import '../styles/CardTitle.css';


const CardTitle = ({ title = "Başlık", description = "", backgroundColor,  }) => {
  const style = backgroundColor ? { backgroundColor } : {};

  return (
    <div className='card-title' style={style}>
      <h1>{title}</h1>
      <p>{description}</p>
  
    </div>
  );
};

export default CardTitle;
