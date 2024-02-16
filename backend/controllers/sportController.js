const express = require('express');
const router = express.Router();
const sportService = require('../services/sportService.js');
const Sport = require('../models/sport.js'); 

router.post('/create', async (req, res) => {
  try {
    const newSport = await sportService.createSport(req.body);
    res.json(newSport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
router.get('/', async (req, res) => {
  try {
    const sports = await Sport.find();
    res.status(200).json({
      status: 'success'
    })
    
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

module.exports = router;
