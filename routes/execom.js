const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Example Execome Route
router.get('/execom/:year', (req, res) => {
  const filePath = path.join(__dirname, '../public/execom.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading execom data' });
    }

    try {
      const execomData = JSON.parse(data);
      const year = req.params.year;

      if (execomData[year]) {
        res.json(execomData[year]);
      } else {
        res.status(404).json({ error: 'Year not found' });
      }
    } catch (parseError) {
      res.status(500).json({ error: 'Error parsing execom data' });
    }
  });
});

module.exports = router;
