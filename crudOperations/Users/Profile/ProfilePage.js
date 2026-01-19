const pool = require("../../../connect.js");

const db = {};

db.getProfileData = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id,firstName,lastName,bio,profilePhoto,accVerified,isPublic FROM `users` WHERE id=?",
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.length == 0) {
          return reject("No user found");
        } else {
          return resolve(result);
        }
      }
    );
  });
};

db.getFriendNumber = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as Num FROM `user_friends` WHERE userId=? or friendId=?",
      [id, id],
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

db.getPostNumber = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT Count(*) as Num from user_posts WHERE userId=? AND status=?",
      [id, 0],
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

db.getPersonalData = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id,email,CAST(dob AS date) AS 'dob',countryCode,mobile,profilePhoto FROM `users` WHERE id=?",
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        } else if (result.length == 0) {
          return reject("No user found");
        } else {
          return resolve(result);
        }
      }
    );
  });
};

db.updateProfileData = (id, firstName, lastName, bio, profilePhoto) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(// removed PFP
          "UPDATE `users` SET firstName=?, lastName=?, bio=? WHERE id=?",
          [firstName, lastName, bio, profilePhoto, id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("No changes made");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.updatePersonalData = (
  id,
  gender,
  mobile,
  dob,
  countryCode,
  address,
  city,
  state,
  country
) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET gender = ?, mobile = ?, dob = ?, countryCode = ?, address = ?, city = ?, state = ?, country = ? WHERE id = ? ",
          [gender, mobile, dob, countryCode, address, city, state, country, id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("No changes made");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

// accStatus = 0 => active
// accStatus = 1 => deactivated
// accStatus = 2 => banned

db.deactivateAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET accStatus = 1 WHERE id=? AND accStatus != 1",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already deactivated");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.activateAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET accStatus = 0 WHERE id=? AND accStatus != 0",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already activated");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.BanAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET accStatus = 2 WHERE id=? AND accStatus != 2",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already banned");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.UnbanAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET accStatus = 0 WHERE id=? AND accStatus != 0",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already unbanned");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.deleteAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query("DELETE FROM `users` WHERE id=?", [id], (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        });
      }
    });
  });
};
// accVerified = 0 => not verified
// accVerified = 1 => verified
db.VerifyAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET accVerified = 1 WHERE id=? AND accVerified != 1",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already verified");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.unVerifyAccount = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET accVerified = 0 WHERE id=? AND accVerified != 0",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already unverified");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

// isPublic = 0 => public
// isPublic = 1 => private

db.setAccountPublic = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET isPublic = 0 WHERE id=? AND isPublic != 0",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already public");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.setAccountPrivate = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(" SELECT * FROM users WHERE id = ? ", [id], (err, result) => {
      if (err) {
        return reject(err);
      } else if (result.length == 0) {
        return reject("Account does not exist");
      } else {
        pool.query(
          "UPDATE `users` SET isPublic = 1 WHERE id=? AND isPublic != 1",
          [id],
          (err, result) => {
            if (err) {
              return reject(err);
            } else if (result.affectedRows == 0) {
              return reject("Account already private");
            } else {
              return resolve(result);
            }
          }
        );
      }
    });
  });
};

db.updatePFP = (url, userId) => {
  return new Promise((resolve, reject) => {
    const updatePFPQuery = "UPDATE `users` SET `profilePhoto`=? WHERE `id`=?";
    pool.query(updatePFPQuery, [url, userId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.deletePFP = (userId) => {
  return new Promise((resolve, reject) => {
    const deletePFPQuery =
      "UPDATE `users` SET `profilePhoto`= NULL WHERE `id`=?";
    pool.query(deletePFPQuery, [userId], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

db.getAccVisibility = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT isPublic FROM users WHERE id = ?",
      [id],
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



module.exports = db;
