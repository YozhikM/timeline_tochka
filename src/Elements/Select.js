import React from "react";

const Select = ({ value, onChange, options, name }) => (
  <select value={value} onChange={onChange} className="form_select" name={name}>
    {options.map(opt => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export default Select;
