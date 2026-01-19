const express = require("express")
const router = express.Router()

const func  = require("../../controllers/Users/searchUser.js")

router.get("/byName/:name",func.searchUserByName)

module.exports = router