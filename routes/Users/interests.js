const express = require("express")
const router = express.Router()

const func = require("../../controllers/Users/interests.js")

router.get("/getAllInterest",func.getAllInterest)
router.post("/createInterest",func.createInterest)
router.patch("/updateInterest",func.updateInterest)
router.delete("/deleteInterest",func.deleteInterest)

module.exports = router