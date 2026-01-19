const pool = require("./../../connect.js");

const db = {};

db.allUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * from users", (err, data) => {
      if (err) {
        return reject(false);
      }
      return resolve(data);
    });
  });
};

db.checkUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email=?", email, (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data.length > 0) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

db.checkUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id=?", id, (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data.length > 0) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

db.getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email=?", email, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

db.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id=?", id, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

db.insertUser = (name, email, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO `users`(`firstName`,`email`, `password`,`accStatus`) VALUES (?,?,?,?)",
      // change this 0 to NULL
      [name, email, password, 0],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.insertId);
      }
    );
  });
};

db.updatePassword = (id, password) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * from users where id=?", id, (err, data) => {
      if (err) {
        return reject(err);
      } else if (data.length == 0) {
        return reject("User Does Not Exist!");
      } else {
        pool.query(
          "UPDATE users SET password=? WHERE id=?",
          [password, id],
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      }
    });
  });
};

db.allReportedUsers = () => {
  return new Promise((resolve, reject) => {
    const reportQuery  = `SELECT users.id AS userId, users.email,users.firstName, users.lastName, COUNT(report_account.reportUserId) AS reports_count, report_account.status 
    FROM users
    INNER JOIN report_account ON users.id = report_account.reportUserId
    GROUP BY users.id, users.email;
    `
    pool.query(reportQuery, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};



module.exports = db;
