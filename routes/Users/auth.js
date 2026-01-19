const express = require("express")
const router = express.Router()
const func = require("../../controllers/Users/auth.js")

router.post("/login",func.loginFunc)
router.post("/register",func.registerFunc)
router.get("/logout",func.logoutFunc)
router.get("/checkUser/:email",func.checkUserByEmail)
router.post("/forgotPass",func.forgotFunc)
router.patch("/resetPass",func.resetPassFunc)
router.patch("/updatePass",func.updatePassword)
router.post("/getId",func.getId)
router.get("/sendOTP/:email",func.sendOTP)
router.get("/verifyOtp/:email/:otp",func.verifyOTP)
router.patch("/updatePassByEmail",func.updatePassByEmail)

module.exports = router 