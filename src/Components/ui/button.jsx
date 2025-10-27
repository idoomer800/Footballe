import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button className={`rounded-md ${className}`} {...props}>{children}</button>
  );
}
