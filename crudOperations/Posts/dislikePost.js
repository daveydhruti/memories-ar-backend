const pool = require("../../connect.js");

const db = {};

db.findDislikeByUserIdAndPostId = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const findLikeQuery =
      "SELECT * FROM `post_dislikes` WHERE `userId` = ? AND `postId` = ?";
    pool.query(findLikeQuery, [userId, postId], (err, result) => {
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

db.dislikePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const likePostQuery =
      "INSERT INTO `post_dislikes` (`userId`, `postId`) VALUES (?,?)";
    pool.query(likePostQuery, [userId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.undislikePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const unlikePostQuery =
      "DELETE FROM `post_dislikes` WHERE `userId` = ? AND `postId` = ?";
    pool.query(unlikePostQuery, [userId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = db;
