const pool = require("../../connect.js");

const db = {};

db.findSavedPostByUserIdAndPostId = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const findSavedQuery =
      "SELECT * FROM `saved_posts` WHERE `userId` = ? AND `postId` = ?";
    pool.query(findSavedQuery, [userId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length) {
        return resolve(true);
      } else {
        return resolve(false);
      }
    });
  });
};

db.savePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const savePostQuery =
      "INSERT INTO `saved_posts` (`userId`, `postId`) VALUES (?,?)";
    pool.query(savePostQuery, [userId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.unsavePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const unsavePostQuery =
      "DELETE FROM `saved_posts` WHERE `userId` = ? AND `postId` = ?";
    pool.query(unsavePostQuery, [userId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getUsersSavedPosts = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      } else if (results.length === 0) {
        return reject("No user found");
      } else {
        pool.query(
          "SELECT sp.postId,upp.photo FROM `saved_posts` sp INNER JOIN user_posts up INNER JOIN user_post_photos upp ON sp.postId=up.id AND sp.postId=upp.postId WHERE sp.userId=?",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.length == 0) {
              return reject("No saved Posts");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

module.exports = db;
