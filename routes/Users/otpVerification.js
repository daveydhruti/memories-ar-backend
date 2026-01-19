const express = require("express");
const router = express.Router();
const { verifyAccount } = require("../../controllers/Users/otpVerification");

// route for verifying otp
router.post("/verify", verifyAccount);

// export router
module.exports = router;
