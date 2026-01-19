const pool = require("../../connect.js");

const db = {};

db.addThemes = (array) => {
  return new Promise((resolve, reject) => {
    const themeQuery = `INSERT INTO account_themes (darkClr, textDarkClr, lightClr, textLightClr, midClr, textMidClr) VALUES (?,?,?,?,?,?);`;
    pool.query(themeQuery, array, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

db.getThemes = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM `account_themes`", (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

db.editTheme = (editThemeQuery, fields) => {
  new Promise((resolve, reject) => {
    pool.query(editThemeQuery, fields, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

db.deleteTheme = (themeId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM `account_themes` WHERE `themeId` = ?",
      themeId,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

db.findUserTheme = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT `themeId` FROM `user_account_details` WHERE `userId` = ?",
      userId,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

db.changeUserTheme = (themeId, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE `user_account_details` SET `themeId` = ? WHERE `userId` = ?",
      [themeId, userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

db.createUserTheme = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO `user_account_details` (`userId`, `themeId`) VALUES (?, 10)",
      [userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

db.getUserTheme = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT `themeId` FROM `user_account_details` WHERE `userId` = ?",
      [userId],
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
