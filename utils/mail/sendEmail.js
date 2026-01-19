require("dotenv").config(); 

const APIKey = process.env.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(APIKey);
const authQueries = require("../../crudOperations/Users/users");
const {verify, reset } = require("./htmlEmail.js")
module.exports  = async (email, otp, type) => {
  try {
    let html;
    if (type === "verify") {
      html =  await verify(otp, (await authQueries.getUserByEmail(email))[0].firstName) 

    } else {
      html = await reset(otp, (await authQueries.getUserByEmail(email))[0].firstName) 
      await sgMail.send({
        to: email,
        from: "MemoriesARemail@gmail.com",
        subject: "Verify you email address for MemoriesAR",
        html: html,
      });
    }
    console.log('Email has been sent to the user.')
  } catch (error) {
    console.log('Email has not been sent to the user.')
    console.log(error);
    return error;
  }
};  
