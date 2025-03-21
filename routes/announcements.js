const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Announcements Route
router.get('/announcements', (req, res) => {
  const filePath = path.join(__dirname, '../public/announcements.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading announcements.json:', err);
      return res.status(500).json({ error: 'Error reading announcements data' });
    }

    try {
      const announcements = JSON.parse(data);
      res.json(announcements);
    } catch (parseError) {
      console.error('Error parsing announcements.json:', parseError);
      res.status(500).json({ error: 'Error parsing announcements data' });
    }
  });
});

module.exports = router;
