const express = require("express")
const router = express.Router()
const func = require("../../controllers/Users/blockedUsers.js")

router.post("/blockUser",func.blockUser)
router.delete("/unblockUser",func.unblockUser)
router.get("/allBlockUser/:id",func.allBlockedUsers)

module.exports = router