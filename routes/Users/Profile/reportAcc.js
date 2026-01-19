const express = require("express")
const router = express.Router()

const func = require("../../../controllers/Users/Profile/reportAccount.js")
const postFunc = require("../../../controllers/Posts/reportPost.js")

router.post("/repAccount",func.reportAccount)
router.post("/repPost",postFunc.reportPost)

module.exports = router