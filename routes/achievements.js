const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Achievements Route
router.get('/achievements', (req, res) => {
  const filePath = path.join(__dirname, '../public/achievements.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading achievements.json:', err);
      return res.status(500).json({ error: 'Error reading achievements data' });
    }

    try {
      const achievements = JSON.parse(data);
      res.json(achievements);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error parsing achievements data' });
    }
  });
});

module.exports = router;
