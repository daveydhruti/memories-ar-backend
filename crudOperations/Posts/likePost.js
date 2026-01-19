const pool = require("../../connect.js");

const db = {};

db.findLikeByUserIdAndPostId = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const findLikeQuery =
      "SELECT * FROM `post_likes` WHERE `userId` = ? AND `postId` = ?";
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

db.likePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const likePostQuery =
      "INSERT INTO `post_likes` (`userId`, `postId`) VALUES (?,?)";
    pool.query(likePostQuery, [userId, postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.unlikePost = (userId, postId) => {
  return new Promise((resolve, reject) => {
    const unlikePostQuery =
      "DELETE FROM `post_likes` WHERE `userId` = ? AND `postId` = ?";
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
