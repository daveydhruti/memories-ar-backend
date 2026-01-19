const pool = require("../../connect.js");

const db = {};

db.findTagByPostIdAndTagId = (postId, tagId) => {
  return new Promise((resolve, reject) => {
    const findTagQuery =
      "SELECT * FROM `user_post_tag` WHERE `postId`=? AND `userId`=?";
    pool.query(findTagQuery, [postId, tagId], (err, result) => {
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

db.tagUser = (postId, tagId) => {
  return new Promise((resolve, reject) => {
    const tagUserQuery =
      "INSERT INTO `user_post_tag`(`postId`, `userId`) VALUES (?,?)";
    pool.query(tagUserQuery, [postId, tagId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.untagUser = (postId, tagId) => {
  return new Promise((resolve, reject) => {
    const untagUserQuery =
      "DELETE FROM `user_post_tag` WHERE `postId`=? AND `userId`=?";
    pool.query(untagUserQuery, [postId, tagId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = db;
