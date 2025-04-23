const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/achievements', (req, res) => {
  const folderPath = path.join(__dirname, '../public/achievements');
  //test

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading achievements folder:', err);
      return res.status(500).json({ error: 'Error reading achievements folder' });
    }

    // Filter only image files (optional: add more extensions if needed)
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file)
    );

    // Return image URLs assuming they're served statically from /achievements
    const imageURLs = imageFiles.map(file => `/achievements/${file}`);

    res.json(imageURLs);
  });
});

module.exports = router;
