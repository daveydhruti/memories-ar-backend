const express = require("express")
const router = express.Router()
const func = require("../../controllers/Users/userRequests.js")

router.post("/sendRequest",func.sendRequest)
router.get("/getAllRequests/:id",func.allRequests)
router.delete("/declineRequest",func.declineRequest)
router.post("/acceptRequest",func.acceptRequest)
router.delete("/unfriend",func.unfriendUser)
router.get("/checkRequest/:userId/:recId",func.checkRequest)

module.exports = router