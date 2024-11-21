import React, { useState } from 'react';
import InputForm from './component/InputForm';
import DropdownFilter from './component/DropdownFilter';
import './App.css';

function App() {
  const [response, setResponse] = useState(null); // Store API response
  const [filteredData, setFilteredData] = useState(null); // Store filtered response data

  // Handle dropdown selection and update filtered data
  const handleFilterChange = (selectedOptions) => {
    if (!response) return;

    const selectedFilters = selectedOptions.map((option) => option.value);
    const filtered = {};

    if (selectedFilters.includes('alphabets')) filtered.alphabets = response.alphabets;
    if (selectedFilters.includes('numbers')) filtered.numbers = response.numbers;
    if (selectedFilters.includes('highest_lowercase')) {
      filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    setFilteredData(filtered);
  };

  return (
    <div className="App">
      <h1 className="app-title">ABCD123</h1>
      <InputForm setResponse={setResponse} />
      {response && (
        <DropdownFilter handleFilterChange={handleFilterChange} />
      )}
      {filteredData && (
        <div className="response-container">
          <h2>Filtered Response:</h2>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;