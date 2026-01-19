const express = require('express');
const router = express.Router();

const func = require('../../controllers/Posts/mapScreen');

router.get("/getPosts/:id", func.getAllPosts);

module.exports = router;