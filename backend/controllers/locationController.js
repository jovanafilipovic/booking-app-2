const express = require('express');
const router = express.Router();
const locationService = require('../services/locationService.js');
const Location = require('../models/location.js'); 


router.post('/create', async (req, res) => {
  try {
    const newLocation = await locationService.createLocation(req.body);
    res.json(newLocation);
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

  
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({
      status: 'success'
    })
    res.json(locations);
  } catch (error) {
    res.status(500).json({ 
      error: error.message 
    });
  }
});

module.exports = router;
