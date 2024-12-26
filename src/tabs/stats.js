import React, { useState } from 'react';
import './stats.css';
import rouletteImage from '../roulette_img.png';

function Stats() {
  const categories = ['Red', 'Black', 'Odd', 'Even', 'High', 'Low'];

  const [numbers, setNumbers] = useState({
    Red: '',
    Black: '',
    Odd: '',
    Even: '',
    High: '',
    Low: '',
  });

  const [total_count, setTotal_count] = useState('');
  const [invalidFields, setInvalidFields] = useState({});
  const [responseMessage, setResponseMessage] = useState(''); 

  const handleInputChange = (key, value) => {
    setNumbers((prev) => ({ ...prev, [key]: value }));
    setInvalidFields((prev) => ({ ...prev, [key]: false })); // Reset invalid state
  };

  // Function to validate the input values
  const validateField = (key, value) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && value.trim() !== '';
  };

  const handleTotalCountChange = (value) => {
    setTotal_count(value);
    setInvalidFields((prevFields) => ({
      ...prevFields,
      'Total Count': !validateField('Total Count', value), // Validate Total Count
    }));
  };

  const handleOkClick = async () => {
    const newInvalidFields = {};

    // Validate each field
    Object.entries(numbers).forEach(([key, value]) => {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || value.trim() === '') {
        newInvalidFields[key] = true;
      }
    });

    const totalCountValue = parseInt(total_count, 10);  // Make sure total_count is an integer
    if (isNaN(totalCountValue) || total_count.trim() === '') {
      newInvalidFields['Total Count'] = true;
    }

    if (Object.keys(newInvalidFields).length > 0) {
      setInvalidFields(newInvalidFields);
      setResponseMessage('Please enter valid numbers in all fields.');
      setTimeout(() => {
        setResponseMessage('');
      }, 3000);
      return;
    }

    // Prepare the data with correct types
    const statsData = { 
      red_statistic: parseFloat(numbers.Red),
      black_statistic: parseFloat(numbers.Black),
      odd_statistic: parseFloat(numbers.Odd),
      even_statistic: parseFloat(numbers.Even),
      high_statistic: parseFloat(numbers.High),
      low_statistic: parseFloat(numbers.Low),
      total_count: totalCountValue
    };

    try {
      // Make the API call to send the data to the backend
      const response = await fetch('http://localhost:8000/update-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statsData),
      });

      if (!response.ok) {
        throw new Error('Failed to send stats');
      }

      // Update response message after success
      setResponseMessage('Stats saved successfully!');
      // Reset all fields after successful submission
      setNumbers({
        Red: '',
        Black: '',
        Odd: '',
        Even: '',
        High: '',
        Low: '',
      });
      setTotal_count('');
      setInvalidFields({});
      //Make sure the response message disappears after 10 seconds
      setTimeout(() => {
        setResponseMessage('');
      }, 10000); 
    } catch (error) {
      console.error(error);
      setResponseMessage('An error occurred while sending stats.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOkClick();  // Trigger OK button click when Enter is pressed
    }
  };

  return (
    <div className="Stats">
      <header className="Stats-header">
        <img src={rouletteImage} className="Stats-logo" alt="roulette logo" />
      </header>

      <div className="inputs-container">
        {categories.map((category) => (
          <div className="number-inputs" key={category}>
            <label className="input-label">{`${category} %`}</label>
            <input
              type="number"
              placeholder={`${category} %`}
              value={numbers[category]}
              onChange={(e) => handleInputChange(category, e.target.value)}
              className={invalidFields[category] ? 'invalid' : ''}
              onKeyDown={handleKeyDown}  // Add the keydown event listener
            />
          </div>
        ))}
        <div className="number-inputs">
          <label className="input-label">{`Total Count`}</label>
          <input
            type="number"
            placeholder="Total Count"
            value={total_count}
            onChange={(e) => handleTotalCountChange(e.target.value)}
            className={invalidFields['Total Count'] ? 'invalid' : ''}
            onKeyDown={handleKeyDown}  // Add the keydown event listener here as well
          />
        </div>

        <button className="ok-button" onClick={handleOkClick}>
          OK
        </button>

        {responseMessage && <p className="response-message">{responseMessage}</p>} {/* Show response message */}
      </div>
    </div>
  );
}

export default Stats;

