// Dropdown.js
import React from 'react';

const Dropdown = ({ options, selectedOption, onChange }) => {
  return (
    <div className="dropdown-container">
      <label htmlFor="options">Select an option:</label>
      <select id="options" onChange={onChange} value={selectedOption}>
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
