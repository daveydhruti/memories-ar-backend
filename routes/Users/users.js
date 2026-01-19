const router = require('express').Router();
const func = require('../../controllers/Users/users');

router.get('/allUsers', func.allUsers);
router.get('/allReportedUsers', func.allReportedUsers);

module.exports = router;