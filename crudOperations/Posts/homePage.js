const pool = require("../../connect.js")

const db = {}

db.getAllPosts = (id)=>{
	return new Promise((resolve,reject)=>{
		pool.query("SELECT ab.userId,ab.profilePhoto,ab.firstName,ab.lastName,ab.id AS postId, ab.PhotoLink,ab.PostLikes,Count(pc.userId) as PostComments from post_comment pc RIGHT JOIN (SELECT abc.id,Count(pl.userId) as PostLikes,abc.userId,abc.profilePhoto,abc.firstName,abc.lastName, abc.PhotoLink from post_likes pl RIGHT JOIN ( SELECT DISTINCT(u.id) AS userId, up.id as id, u.profilePhoto,u.firstName,u.lastName, upp.photo as PhotoLink from users u INNER JOIN user_posts up INNER JOIN (SELECT userId,friendId,friendDate FROM `user_friends` WHERE `userId` = ? OR `friendId` = ?) v INNER JOIN user_post_photos upp ON (u.id=v.userId OR u.id=v.friendId) AND u.id=up.userId AND up.id=upp.postId ) abc ON pl.postId=abc.id GROUP BY abc.id) ab ON pc.postId=ab.id GROUP BY ab.id ORDER BY postId DESC",[id,id],(err,results)=>{
			if(err)
			{
				reject(err)
			}
			else
			{
				resolve(results)
			}
		})
	})
}

module.exports = db