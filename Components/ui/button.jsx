import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button className={`rounded-md px-4 py-2 font-semibold ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
