const express = require('express');
const { addMood, getMoods } = require('../controllers/moodController');
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth');

const router = express.Router();

// Route to add a new mood
router.post('/addmood', addMood);

// Route to get moods between two users
router.post('/getmoods' , getMoods);
module.exports = router;