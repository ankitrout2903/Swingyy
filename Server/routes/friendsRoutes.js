const { addFriend, getFriends, getPossibleFriends } = require('../controllers/friendsController');

const router = require('express').Router();

router.post('/addFriend', addFriend);
router.get('/getFriends/:id', getFriends);
router.get('/getPossibleFriends/:id', getPossibleFriends)

module.exports = router;