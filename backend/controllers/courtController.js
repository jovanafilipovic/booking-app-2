const express = require('express');
const router = express.Router();
const courtService = require('../services/courtService.js');
const Court = require('../models/court.js');

router.post('/create', async (req, res) => {
  try {
    const newCourt = await courtService.createCourt(req.body);
    res.json(newCourt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  
router.get('/', async (req, res) => {
  try {
    const courts = await Court.find();
    res.status(200).json({
      status: 'success'
    })

    res.json(courts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}); 

module.exports = router;
