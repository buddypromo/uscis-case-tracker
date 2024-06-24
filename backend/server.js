const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

app.get('/api', async (req, res) => {
  const { caseNumber } = req.query;
  try {
    const response = await axios.get(`https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=${caseNumber}`);
    const $ = cheerio.load(response.data);
    const status = $('#formSection .rows h1').text();
    const details = $('#formSection .rows p').text();
    
    if (status) {
      res.json({ status, details });
    } else {
      res.status(404).json({ error: 'Case not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching case status' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

