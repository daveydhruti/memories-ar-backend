const express = require("express")
const router = express.Router()

const func = require("../../controllers/Users/userInterests.js")

router.get("/getAllUserInterest",func.getAllInterest)
router.post("/createUserInterest",func.createInterest)
router.delete("/deleteUserInterest",func.deleteInterest)

module.exports = router