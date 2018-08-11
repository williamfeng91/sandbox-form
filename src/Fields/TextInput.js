import React from "react";

const TextInput = React.forwardRef(({ onValueChange, ...props }, ref) => (
  <input {...props} ref={ref} onChange={e => onValueChange(e.target.value)} />
));

export default TextInput;
