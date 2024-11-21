import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase', label: 'Highest Lowercase Alphabet' },
];

const DropdownFilter = ({ handleFilterChange }) => {
  return (
    <div className="dropdown-filter">
      <h3>Select Filters:</h3>
      <Select
        isMulti
        options={options}
        onChange={handleFilterChange}
        placeholder="Select response fields to display..."
      />
    </div>
  );
};

export default DropdownFilter;
