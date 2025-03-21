const express = require('express');
const router = express.Router();

router.get('/achievements', (req, res) => {
  res.json({ message: 'API' });
});

module.exports = router;
