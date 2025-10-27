import React from 'react';

export const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input ref={ref} className={`rounded-md border px-3 py-2 ${className}`} {...props} />
));

export default Input;
