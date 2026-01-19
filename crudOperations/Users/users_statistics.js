const pool = require("./../../connect.js");

const db = {};

db.totalNumberOfUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as totalNumberOfUsers FROM users",
      (err, data) => {
        if (err) {
          return reject(err);
        } else if (this.totalNumberOfUsers == 0) {
          return reject("There are no users in the database");
        }
        return resolve(data);
      }
    );
  });
};

db.totalNumberOfActiveUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as totalNumberOfActiveUsers FROM users WHERE accStatus = 0",
      (err, data) => {
        if (err) {
          return reject(err);
        } else if (this.totalNumberOfActiveUsers == 0) {
          return reject("There are no active users in the database");
        }
        return resolve(data);
      }
    );
  });
};

db.totalNumberOfDeactivatedUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as totalNumberOfDeactivatedUsers FROM users WHERE accStatus = 1",
      (err, data) => {
        if (err) {
          return reject(err);
        } else if (this.totalNumberOfDeactivatedUsers == 0) {
          return reject("There are no deactivated users in the database");
        }
        return resolve(data);
      }
    );
  });
};

db.totalNumberOfBannedUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as totalNumberOfBannedUsers FROM users WHERE accStatus = 2",
      (err, data) => {
        if (err) {
          return reject(err);
        } else if (this.totalNumberOfBannedUsers == 0) {
          return reject("There are no banned users in the database");
        }
        return resolve(data);
      }
    );
  });
};

db.numberOfReportedUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT( DISTINCT reportUserId ) as numberOfReportedUsers FROM report_account",
      (err, data) => {
        if (err) {
          return reject(err);
        } else if (this.numberOfReportedUsers == 0) {
          return reject("There are no reported users in the database");
        }
        return resolve(data);
      }
    );
  });
};

db.numberOfReportedPosts = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT( DISTINCT postId ) as numberOfReportedPosts FROM report_posts",
      (err, data) => {
        if (err) {
          return reject(err);
        } else if (this.numberOfRepoertedPosts == 0) {
          return reject("There are no reported posts in the database");
        }
        return resolve(data);
      }
    );
  });
};

db.numberOfUserFriends = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("No id provided");
    } else {
      pool.query(
        "SELECT COUNT(*) as numberOfUserFriends FROM user_friends WHERE userId = ?",
        [id],
        (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        }
      );
    }
  });
};

db.numberOfUserPosts = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("No id provided");
    } else {
      pool.query(
        "SELECT COUNT(*) as numberOfUserPosts FROM user_posts WHERE userId = ?",
        [id],
        (err, data) => {
          if (err) {
            return reject(err);
          } else if (this.numberOfUserPosts == 0) {
            return reject("There are no posts by this user");
          } else {
            return resolve(data);
          }
        }
      );
    }
  });
};

db.getActiveUsersByDate = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    if (!startDate || !endDate) {
      return reject("No date provided");
    } else {
      pool.query(
        "SELECT COUNT(*) as activeUsersByDate FROM `users` WHERE `accStatus` = 0 AND `doj` BETWEEN ? AND ?",
        [startDate, endDate],
        (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        }
      );
    }
  });
};

db.getDeactivatedUsersByDate = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    if (!startDate || !endDate) {
      return reject("No date provided");
    } else {
      pool.query(
        "SELECT COUNT(*) as deactivatedUsersByDate FROM `users` WHERE `accStatus` = 1 AND `statusTime` BETWEEN ? AND ?",
        [startDate, endDate],
        (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        }
      );
    }
  });
};

db.getBannedUsersByDate = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    if (!startDate || !endDate) {
      return reject("No date provided");
    } else {
      pool.query(
        "SELECT COUNT(*) as bannedUsersByDate FROM `users` WHERE `accStatus` = 2 AND `statusTime` BETWEEN ? AND ?",
        [startDate, endDate],
        (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        }
      );
    }
  });
};

db.totalNumberOfPosts = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as numOfPosts FROM `user_posts`",
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });
};

db.totalNumberOfFriends = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as numOfFriends FROM `user_friends`",
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });
};

module.exports = db;
