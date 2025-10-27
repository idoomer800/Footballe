import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-md shadow ${className}`} {...props}>{children}</div>
  );
}

export default Card;
