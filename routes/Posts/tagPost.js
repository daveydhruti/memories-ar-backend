const router = require('express').Router();
const { tagUser, untagUser } = require('../../controllers/Posts/tagPost.js');

router.post('/tag', tagUser)
router.delete('/untag', untagUser)

module.exports = router;

//changes made