const fetchCaseStatus = async () => {
  setLoading(true);
  setError('');
  try {
    const response = await axios.get(`https://uscis-case-tracker-backend-3p9aqgji5-buddy-promos-projects.vercel.app/api?caseNumber=${caseNumber}`);
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
