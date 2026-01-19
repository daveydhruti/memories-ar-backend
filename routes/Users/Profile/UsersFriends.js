const router = require('express').Router();
const {getFriendsLists,checkIsFriend} = require('../../../controllers/Users/Profile/UsersFriends.js');

//get Profile Page
router.get('/friends/:id', getFriendsLists);    
router.get('/checkIsfriends/:id/:friend', checkIsFriend);    

module.exports = router;