const pool = require("../../connect.js");

const db = {};

db.createPost = (userId, caption, lattitude, longitude, flag) => {
  return new Promise((resolve, reject) => {
    const createPostQuery =
      "INSERT INTO `user_posts`(`userId`, `caption`, `lattitude`, `longitude`, `flag`) VALUES (?,?,?,?,?)";
    pool.query(
      createPostQuery,
      [userId, caption, lattitude, longitude, flag],
      (err, result) => {
        if (err) {
          console.log(err)
          return reject({ message: "Error creating a post. ", error: err.message });
        } else {
          return resolve(result);
        }
      }
    );
  });
};

db.findPostById = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery = "SELECT * FROM `user_posts` WHERE `id`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
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

db.findUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery = "SELECT * FROM `users` WHERE `id`=?";
    pool.query(findPostQuery, [userId], (err, result) => {
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

db.findAllPostsByUserId = (userId) => {
  console.log(userId);
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT up.id AS postId, upp.photo,up.userId FROM `user_posts` up INNER JOIN user_post_photos upp ON up.id=upp.postId WHERE `userId`=?";
    pool.query(findPostQuery, [userId], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length) {
        return resolve(result);
      } else {
        return resolve("No Posts Available");
      }
    });
  });
};

db.findPostByIdAndUserId = (postId, userId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery =
      "SELECT * FROM `user_posts` WHERE `id`=? AND `userId`=?";
    pool.query(findPostQuery, [postId, userId], (err, result) => {
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

db.editPost = (userId, postId, editPostQuery, fields) => {
  return new Promise((resolve, reject) => {
    pool.query(
      editPostQuery,
      fields.concat([userId, postId]),
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

db.deletePost = (postId) => {
  return new Promise((resolve, reject) => {
    const deletePostQuery = "DELETE FROM `user_posts` WHERE `id`=?";
    pool.query(deletePostQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deleteAllPostCommentsById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `post_comment` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deleteAllPostLikesById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `post_likes` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deleteAllPostDisikesById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `post_dislikes` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

//delete reported posts?

db.deletePostsFromSavedById = (postId) => {
  return new Promise((resolve, reject) => {
    const deleteCommentsQuery = "DELETE FROM `saved_posts` WHERE `postId`=?";
    pool.query(deleteCommentsQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.checkIdImageExists = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery = "SELECT * FROM `user_post_photos` WHERE `postId`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
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

db.uploadImage = (postId, photo) => {
  return new Promise((resolve, reject) => {
    const uploadImageQuery =
      "INSERT INTO `user_post_photos`(`postId`, `photo`) VALUES (?,?)";
    pool.query(uploadImageQuery, [postId, photo], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.findImageById = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery = "SELECT * FROM `user_post_photos` WHERE `postId`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getPostImageById = (postId) => {
  return new Promise((resolve, reject) => {
    const findPostQuery = "SELECT * FROM `user_post_photos` WHERE `postId`=?";
    pool.query(findPostQuery, [postId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getPostDetails = () => {
  return new Promise((resolve, reject) => {
    const findPostQuery = `SELECT users.email, users.firstName, users.lastName, users.id AS userId, 
    user_posts.id AS postId, user_posts.status, user_posts.caption, user_posts.uploadTime, user_posts.dateEdited, user_post_photos.photo AS image
    FROM users
    INNER JOIN user_posts ON users.id = user_posts.userId
    LEFT JOIN user_post_photos ON user_posts.id = user_post_photos.postId;`;
    pool.query(findPostQuery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getAllReportedPosts = () => {
  return new Promise((resolve, reject) => {
    const findPostQuery = `SELECT users.id AS userId, users.firstName, users.lastName, users.email, user_posts.uploadTime, report_posts.postId , COUNT(report_posts.postId) AS reports_count, user_post_photos.photo AS image
    FROM users
    INNER JOIN report_posts ON users.id = report_posts.userId
    INNER JOIN user_posts ON user_posts.id = report_posts.postId
    LEFT JOIN user_post_photos ON report_posts.postId = user_post_photos.postId
    GROUP BY report_posts.postId;`;

    pool.query(findPostQuery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getAllDislikedPosts = () => {
  return new Promise((resolve, reject) => {
    const findPostQuery = `SELECT users.id AS userId, users.firstName, users.lastName, users.email, user_posts.uploadTime, post_dislikes.postId , COUNT(post_dislikes.postId) AS dislikes_count, user_post_photos.photo AS image
    FROM users
    INNER JOIN post_dislikes ON users.id = post_dislikes.userId
    INNER JOIN user_posts ON user_posts.id = post_dislikes.postId 
    LEFT JOIN user_post_photos ON post_dislikes.postId = user_post_photos.postId
    GROUP BY post_dislikes.postId;`;
    pool.query(findPostQuery, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getPostById = (id) => {
  return new Promise((resolve, reject) => {
    const findPostQuery = `SELECT up.caption,up.uploadTime,up.lattitude,up.longitude,up.flag,u.id AS userId,u.firstName,u.lastName,u.profilePhoto,upp.photo FROM user_posts up INNER JOIN users u INNER JOIN user_post_photos upp ON up.userId=u.id AND upp.postId=up.id WHERE up.id=?`;
    pool.query(findPostQuery, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getFictionalPosts = (userId) => {
  return new Promise((resolve, reject) => {
    const hehehe = `SELECT * FROM user_posts WHERE userId = ? AND status = 0`;
    pool.query (hehehe, [userId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getOpinionPosts = (userId) => {
  return new Promise((resolve, reject) => {
    const hehehe = `SELECT * FROM user_posts WHERE userId = ? AND status = 1`;
    pool.query (hehehe, [userId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = db;
