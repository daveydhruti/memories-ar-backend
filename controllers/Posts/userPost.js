const db = require("../../connect.js");
const { findAllPostsByUserId } = require("../../crudOperations/Posts/userPost");
const queries = require("../../crudOperations/Posts/userPost");
const { uploadImage, decode } = require("../../functions/index");
const likeQueries = require("../../crudOperations/Posts/likePost.js");
const dislikeQueries = require("../../crudOperations/Posts/dislikePost.js");
const savedQueries = require("../../crudOperations/Posts/savePost.js");
const tagQueries = require("../../crudOperations/Posts/tagPost");

const fs = require("fs");
const UUID = require("uuid-v4");


const createPost = async (req, res) => {
  const { userId, caption, lattitude, longitude, flag, tag } = req.body;
  let { postImage } = req.body;
  const uuid = UUID();
  postImage = decode(postImage);
  // testing 
  // postImage = require('../../functions/image.js')
  let imageUrl;
  try {
    imageUrl = uploadImage(postImage, uuid);
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message);
  }
  if (!userId || !caption || !lattitude || !longitude) {
    res.status(404).json("Empty fields");
  } else {
    try {
      const result = await queries.createPost(
        userId,
        caption,
        lattitude,
        longitude,
        flag ? flag : 0
      );
      if (tag.length > 0) {
        let tagCopy = tag.slice(1, tag.length - 1).split(",");
        if (tagCopy.length > 0) {
          for (let i = 0; i < tagCopy.length; i++) {
            await tagQueries.tagUser(result.insertId, tagCopy[i]);
          }
        }
      }
     try
     {
      await queries.uploadImage(result.insertId, imageUrl);
      return res.status(200).json("Post was created successfully.");
     }
     catch(error)
     {
        console.log(error)
     }
     
    } catch (error) {
      return res.status(400).json(error);
    }
  }

};

const editPost = async (req, res) => {
  const { userId, postId, image, caption, lattitude, longitude } = req.body;
  if (!userId || !postId) {
    return res.status(404).json("Invalid user/post ID");
  }
  if (!image && !caption && !lattitude && !longitude) {
    //check error code
    return res.status(400).json("No details to be updated");
  }
  let fields = [];
  try {
    if (!(await queries.findPostByIdAndUserId(postId, userId))) {
      res.status(404).json("Post doesn't exist");
    } else {
      let editPostQuery =
        "UPDATE `user_posts` SET `dateEdited` = CURRENT_TIMESTAMP(), ";
      let bool = false;
      if (image) {
        editPostQuery = editPostQuery + " `image` = ?";
        bool = true;
        fields.push(image);
      }
      if (caption) {
        if (bool) {
          editPostQuery = editPostQuery + ",";
        }
        editPostQuery = editPostQuery + " `caption` = ?";
        bool = true;
        fields.push(caption);
      }
      if (lattitude) {
        if (bool) {
          editPostQuery = editPostQuery + ",";
        }
        editPostQuery = editPostQuery + " `lattitude` = ?";
        bool = true;
        fields.push(lattitude);
      }
      if (longitude) {
        if (bool) {
          editPostQuery = editPostQuery + ",";
        }
        editPostQuery = editPostQuery + " `longitude` = ?";
        fields.push(longitude);
      }
      editPostQuery = editPostQuery + " WHERE `userId` = ? AND `id` = ?";
      const result = await queries.editPost(
        userId,
        postId,
        editPostQuery,
        fields
      );
      return res.status(200).json("Post updated successfully.");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deletePost = async (req, res) => {
  console.log("Helloqwe")
  const { userId, postId } = req.params;
  console.log(userId, postId)
  if (!userId || !postId) {

    return res.status(404).json("Invalid user/post ID");
  }
  try {
    if (await queries.findPostByIdAndUserId(postId, userId)) {
      console.log("Hello")
      try
      {
        await queries.deletePost(postId);
      }
      catch(error)
      {
        console.log(error)
      }
      
      return res.status(200).json("Post deleted successfully");
    } else {
      return res.status(404).json("Post doesn't exist");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllUserPosts = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json("Invalid user ID");
  }
  try {
    const result = await findAllPostsByUserId(id);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getPostImage = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(404).json("Invalid post ID");
  }
  try {
    const result = await queries.getPostImageById(postId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllPostDetails = async (req, res) => {
  try {
    const result = await queries.getPostDetails();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllReportedPosts = async (req, res) => {
  try {
    const result = await queries.getAllReportedPosts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllDislikedPosts = async (req, res) => {
  try {
    const result = await queries.getAllDislikedPosts();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(404).json("Invalid post ID");
  }
  try {
    const result = await queries.getPostById(postId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const checkLiked = async (req, res) => {
  const { userId, postId } = req.params;
  if (!userId || !postId) {
    return res.status(404).json("Invalid user/post ID");
  }
  try {
    const result = await likeQueries.findLikeByUserIdAndPostId(userId, postId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const checkDisliked = async (req, res) => {
  const { userId, postId } = req.params;
  if (!userId || !postId) {
    return res.status(404).json("Invalid user/post ID");
  }
  try {
    const result = await dislikeQueries.findDislikeByUserIdAndPostId(
      userId,
      postId
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const checkSaved = async (req, res) => {
  const { userId, postId } = req.params;
  if (!userId || !postId) {
    return res.status(404).json("Invalid user/post ID");
  }
  try {
    const result = await savedQueries.findSavedPostByUserIdAndPostId(
      userId,
      postId
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getFictionalPosts = async (req, res) => {
  try {
    const userId = req.params;
    const result = await queries.getFictionalPosts(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getOpinionPosts = async (req, res) => {
  try {
    const userId = req.params;
    const result = await queries.getOpinionPosts(userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAllUserPosts,
  getPostImage,
  getAllPostDetails,
  getAllReportedPosts,
  getAllDislikedPosts,
  getPostById,
  checkLiked,
  checkDisliked,
  checkSaved,
  getFictionalPosts,
  getOpinionPosts
};
