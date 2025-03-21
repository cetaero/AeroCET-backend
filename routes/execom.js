const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/execom', (req, res) => {
  const filePath = path.join(__dirname, '../public/execom.json');

  // Read the JSON file and send it as a response
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

module.exports = router;
