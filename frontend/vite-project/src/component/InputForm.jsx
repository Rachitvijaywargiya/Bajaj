import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ setResponse }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

  
    let parsedInput;
    try {
      parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) {
        throw new Error('Invalid JSON format. Missing "data" field.');
      }
    } catch (err) {
      setError(err.message);
      return;
    }

  
    try {
      const res = await axios.post('https://your-backend-url/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Error connecting to the backend.');
    }
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Enter JSON (e.g. { "data": ["A", "B", "C"] })'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows="6"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;