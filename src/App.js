import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [caseStatus, setCaseStatus] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  const fetchCaseStatus = async () => {
    setLoading(true);
    setError('');
    try {
      // If caseNumber is empty, do not proceed with the fetch option
      if (!caseNumber) {
        setError('Please enter a case number.');
        return;
      }

      const response = await axios.get(`https://uscis-case-tracker-backend-9gkhhxv2s-buddy-promos-projects.vercel.app/api?caseNumber=${caseNumber}`);
      setCaseStatus(`${response.data.status}: ${response.data.details}`);
    } catch (error) {
      console.error('Error fetching case status:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setError(`Error: ${error.response.data.error || 'Failed to fetch case status'}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        setError('Error: No response received from server');
      } else {
        console.error('Error message:', error.message);
        setError(`Error: ${error.message}`);
      }
      setCaseStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={caseNumber}
        onChange={(e) => setCaseNumber(e.target.value)}
        placeholder="Enter case number"
      />
      <button onClick={fetchCaseStatus}>Fetch Case Status</button>
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      {caseStatus && <p>Case Status: {caseStatus}</p>}
    </div>
  );
};

export default App;
