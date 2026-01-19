const express = require("express");
const router = express.Router();
const { themes, platformSettings, interests } = require('../../controllers/Users/user_platform.js')  

router.get("/themes", themes);
router.get("/platformSettings", platformSettings);
router.get("/interests", interests);

module.exports = router;

