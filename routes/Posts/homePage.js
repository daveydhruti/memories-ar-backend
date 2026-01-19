const express = require("express")
const router = express.Router()
const func = require("../../controllers/Posts/homePage.js")

router.get("/usersFeed/:id",func.homePage)

module.exports = router
