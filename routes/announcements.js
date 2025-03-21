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

      // Modify announcements to include a direct download link
      const updatedAnnouncements = announcements.map(item => {
        if (item.excel) {
          item.downloadUrl = `/announcements/download/${item.id}`;
        }
        return item;
      });

      res.json(updatedAnnouncements);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Error parsing announcements data' });
    }
  });
});

// Route to handle Excel file download
router.get('/announcements/:id', (req, res) => {
  const filePath = path.join(__dirname, `../public/announcements/${req.params.id}.xlsx`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath);
  });
});

module.exports = router;
