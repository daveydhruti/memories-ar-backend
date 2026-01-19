const pool = require("../../connect.js");

const db = {};

// create a new otp token
db.createToken = (email, otp, type) => {
  return new Promise((resolve, reject) => {
    const createOtpQuery =
      "INSERT INTO `otp_verification` (`emailId`, `otp`, `type`) VALUES (?,?,?)";
    pool.query(createOtpQuery, [email, otp, type], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

// check if otp is valid
db.checkOtpValid = (email, otp) => {
    return new Promise((resolve, reject) => {
        const checkOtpQuery = "SELECT * FROM `otp_verification` WHERE `emailId` = ? AND `otp` = ?";
        pool.query(checkOtpQuery, [email, otp], (err, result) => {
			if (err) {
				return reject(err);
			} else if (result.length === 0) {
				return resolve(false);
			} else {
				return resolve(true); // otp is valid
			}
        });
    });
};

// check if otp is expired
db.checkOtpExpired = (userId, otp) => {
  return new Promise((resolve, reject) => {
    const checkOtpQuery =
      "SELECT TIMESTAMPDIFF(MINUTE, `createdAt`, NOW()) AS `timeDiff` FROM `otp_verification` WHERE `emailId` = ? AND `otp` = ?";
    pool.query(checkOtpQuery, [userId, otp], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length === 0) {
        return reject("No otp found");
      } else {
        return resolve(result[0].timeDiff <= 5); // true is otp isnt expiredw
      }
    });
  });
};

//check if otp exists
db.checkOtpExists = (userId) => {
	return new Promise((resolve, reject) => {
		const checkOtpQuery =
		"SELECT TIMESTAMPDIFF(MINUTE, `createdAt`, NOW()) AS `timeDiff` FROM `otp_verification` WHERE `id` = ?";
		pool.query(checkOtpQuery, [userId], (err, result) => {
		if (err) {
			return reject(err);
		} else if (result.length === 0) {
			return resolve(false); // otp does not exist
		} else {
			return resolve(true); // otp exists
		}
		});
	});
};

// account status null = unverified, 0 = verified

// check if user is already verified
db.checkUserVerified = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM `users` WHERE `id`=? AND (`accStatus` IS NULL)",
      id,
      (err, data) => {
        if (err) {
          return reject(err);
        }
        if (data.length > 0) {
          return resolve(false);
        } else {
          return resolve(true);
        }
      }
    );
  });
};

// change account status to verified
db.verifyUser = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE `users` SET `accStatus`=? WHERE `id`=?",
      [0, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

module.exports = db;
