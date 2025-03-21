const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Achievements Route - Dynamically Fetch Images from "public/achievements"
router.get('/achievements', (req, res) => {
  const achievementsDir = path.join(__dirname, '../public/achievements');

  fs.readdir(achievementsDir, (err, files) => {
    if (err) {
      console.error('Error reading achievements directory:', err);
      return res.status(500).json({ error: 'Error reading achievements directory' });
    }

    // Filter only image files (optional)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Map files to URLs (assuming your Express app serves `public` statically)
    const achievements = imageFiles.map((file, index) => ({
      id: index + 1,
      image: `/achievements/${file}` // Relative path (served statically)
    }));

    res.json(achievements);
  });
});

module.exports = router;
