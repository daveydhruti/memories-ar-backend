const express = require("express")
const router = express.Router()

const func = require("../../controllers/Themes/theme.js")

router.get("/getAllThemes",func.getThemes)
router.post("/addThemes",func.addThemes)
router.patch("/editTheme", func.editTheme)
router.delete("/deleteTheme", func.deleteTheme)

// user themes
router.patch("/selectUserTheme", func.selectUserTheme)
router.get("/getUserTheme/:userId", func.getUserTheme)

module.exports = router