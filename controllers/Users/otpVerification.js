const userQueries = require("../../crudOperations/Users/users");
const queries = require("../../crudOperations/Users/otpVerification");

// verify user's account
const verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;
    //check if user exists
    if (!email || !otp) return res.status(400).json("Please enter all details");
    const user = await userQueries.getUserByEmail(email);
    const id = user[0].id;
    if (!await userQueries.checkUserById(id)) return res.status(404).json("User doesn't exist");;

    // check if user is already verified
    if (await queries.checkUserVerified(id)) {
      return res.status(400).json("User already verified");
    }

    // check if otp is valid
    if (!await queries.checkOtpValid(email, otp)) {
      return res.status(400).json("Invalid otp");
    }
    
    // check if otp is expired
    if (!await queries.checkOtpExpired(email, otp)) {
      return res.status(400).json("Otp expired");
    }
    // update user's account status to verified
    await queries.verifyUser(id);
    return res.status(200).json("Account verified");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { verifyAccount };
