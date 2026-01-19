const queries = require("../../crudOperations/Users/users");
const verificationQueries = require("../../crudOperations/Users/otpVerification");
const profileQueries = require("../../crudOperations/Users/Profile/ProfilePage");

// theme queries
const themeQueries = require("../../crudOperations/Themes/theme.js");

const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
// const mailer = require("../sendMail.js")

//importing sendgrid mailer
const sendEmail = require("../../utils/mail/sendEmail.js");

const getId = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "secretkey", async (err, paylod) => {
    if (err) {
      return res.status(404).json(err);
    } else {
      const userId = paylod;
      return res.status(200).json(userId);
    }
  });
};

const checkUserByEmail = async (req, res) => {
	const email = req.params.email;
	if (!email) {

		return res.status(400).json("Email is required!");
	}
	try {
		if (await queries.checkUserByEmail(email)) {
			return res.status(200).json(true);
		} else {
			return res.status(404).json(false);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
};

//Functin to login to the account
const loginFunc = async (req, res) => {
	const email = req.body.email;
	const checkpassword = req.body.password;
	// check if all details are entered
	if (!email || !checkpassword) {
		return res.status(400).json("Please Enter All Details.");
	}

	// check if user exists
	try {
		if (!(await queries.checkUserByEmail(email))) {
		return res.status(404).json(false);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
	// check if password is correct
	const data = await queries.getUserByEmail(email);
	const checkPass = bcrypt.compareSync(checkpassword, data[0].password);
	if (!checkPass) {
		return res.status(400).json("Incorrect password.");
  }
	// check if the user is verified
  if (data[0].accStatus == 2) {
    return res.status(400).json("Account Banned!");
	}
  let message = "User logged in successfully."
  if (data[0].accStatus == 1) {
    await profileQueries.activateAccount(data[0].id)
    message = "User account reactivated successfully."
  }
	// create a token for creating asuccessfully session
	const token = jwt.sign({ id: data[0].id }, "secretkey");
	res
		.cookie("accessToken", token)
		.status(200)
		.json({ token: token, userId: data[0].id, message: message });
};

const sendOTP = async (req, res) => {
	const email = req.params.email;
	if (!email) {
		return res.status(400).json("Email is required!");
	}
	try {
		const OTP = otpGenerator.generate(6, {
			lowerCaseAlphabets: false,
			upperCaseAlphabets: false,
			specialChars: false,
		});
		await verificationQueries.createToken(email, OTP, "verify");
		await sendEmail(email, OTP, "verification"); // for verificatrion
		return res.status(200).json(true);
	}
	catch (error) {
		return res.status(500).json(error);
	}
};

//Functin to regiter the user
const registerFunc = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !name || !password) {
    return res.status(400).json("Please Enter All Details.");
  }
  try {
    if (await queries.checkUserByEmail(email)) {
      return res.status(409).json("User Already Exists!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);
  try {
    const user = await queries.insertUser(name, email, hashedPass);
    if(user)
    {
      await themeQueries.createUserTheme(user);
      return res.status(200).json("User Registered Successfully!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Function to logout user
const logoutFunc = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json(true);
};

//Function to very whether user is logged in or not
async function verifyUser(req, res, next) {
  const token = req.cookies.token;
  if (token === undefined) {
    return res.status(404).json("Access Denied! User Not Logged In");
  } else {
    jwt.verify(token, "secretkey", (err, authData) => {
      if (err) {
        return res.status(404).json("Access Denied! User Not Logged In");
      } else {
        next();
      }
    });
  }
}
// function to update user password when logged in
const updatePassword = async (req, res) => {
  const id = req.body.id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  if (!id) {
    return res.status(400).json("ID is required!");
  }
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json("Please Enter All Details.");
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json("Passwords do not match!");
  }
  if (newPassword === oldPassword) {
    return res.status(400).json("New Password cannot be same as old password!");
  }
  try {
    if (!(await queries.checkUserById(id))) {
      return res.status(404).json("User Does Not Exist!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  const data = await queries.getUserById(id);
  const checkPass = bcrypt.compareSync(oldPassword, data[0].password);
  if (!checkPass) {
    return res.status(400).json("Wrong Credentials!");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(newPassword, salt);
  try {
    const user = await queries.updatePassword(id, hashedPass);
    if (user) {
      return res.status(200).json("Password Updated Successfully.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updatePassByEmail = async (req, res) => {
	const email = req.body.email;
	const newPassword = req.body.newPassword;
	if (!email || !newPassword) {
		return res.status(400).json(1);
	}
	try {
		if (!(await queries.checkUserByEmail(email))) {
			return res.status(404).json(2);
		}
	} catch (error) {
		return res.status(500).json(5);
	}
	const data = await queries.getUserByEmail(email);
	const salt = bcrypt.genSaltSync(10);
	const hashedPass = bcrypt.hashSync(newPassword, salt);
	if(bcrypt.compareSync(newPassword, data[0].password))
	{
		return res.status(400).json(3);
	}
	try {
		const user = await queries.updatePassword(data[0].id, hashedPass);
		if (user) {
			return res.status(200).json(0);
		}
	}
	catch (error) {
		return res.status(500).json(5);
	}
}

//Function for forget password
const forgotFunc = async (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json("Email is required!");
  }
  try {
    if (!(await queries.checkUserByEmail(email))) {
      return res.status(404).json("User Does Not Exist!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  await verificationQueries.createToken(email, OTP, "reset");
  await sendEmail(email, OTP, "password reset"); // for verificatrion
  return res.status(200).json("OTP Sent!");
};

//Function for forget password
const resetPassFunc = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json("Please Enter All Details.");
  }
  try {
    if (!(await queries.checkUserByEmail(email))) {
      return res.status(404).json("User Does Not Exist!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
  // check if otp is valid
  if (!await verificationQueries.checkOtpValid(email, otp)) {
    return res.status(400).json("Invalid otp");
  }
  
  // check if otp is expired
  // if (!await verificationQueries.checkOtpExpired(email, otp)) {
  //   return res.status(400).json("Otp expired");
  // }
  
  const data = await queries.getUserByEmail(email)
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(newPassword, salt);
  try {
    const user = await queries.updatePassword(data[0].id, hashedPass);
    if (user) {
      return res.status(200).json("Password Updated Successfully.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }  
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.params;
  if (!email || !otp) {
    return res.status(400).json("Please Enter All Details.");
  }
  // check if otp is valid
  if (!await verificationQueries.checkOtpValid(email, otp)) {
    return res.status(400).json(false);
  }
  else
  {
    return res.status(200).json(true);
  }
}


module.exports = {
  loginFunc,
  registerFunc,
  logoutFunc,
  forgotFunc,
  resetPassFunc,
  updatePassword,
  getId,
  checkUserByEmail,
  sendOTP,
  verifyOTP,
  updatePassByEmail,
};
