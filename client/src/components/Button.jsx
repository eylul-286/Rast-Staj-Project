import React from 'react';

import '../styles/CardTitle.css';


const Button = ({ title = "Başlık", description = "", backgroundColor, button ="button"  }) => {
  const style = backgroundColor ? { backgroundColor } : {};

  return (
    <div className='card-title' style={style}>
      <h1>{title}</h1>
      <p>{description}</p>
      <button>{button} </button>
  
    </div>
  );
};

export default Button;
