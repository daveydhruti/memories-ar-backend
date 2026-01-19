const queries = require("../../crudOperations/Groups/groupMember.js");
const postQueries = require("../../crudOperations/Posts/userPost");
const groupQueries = require("../../crudOperations/Groups/group");

// add member to group
const addMember = async (req, res) => {
  const { userId, groupId, adminId } = req.body;
  if (!userId || !groupId || !adminId)
    return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findUserById(adminId))) {
      return res.status(404).json("Invalid admin ID");
    }
    if (!(await queries.isAdmin(adminId, groupId))) {
      return res.status(403).json("You are not an admin / member of this group.");
    }
    if (await queries.isMember(userId, groupId)) {
      return res.status(400).json("User is already a member of this group.");
    }
    if(await queries.isGroupFull(groupId)) {
      return res.status(400).json("Group is full.");
    }
    await queries.addMember(userId, groupId);
    return res.status(200).json("Member was added successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// remove member from group
const removeMember = async (req, res) => {
  const { userId, groupId, adminId } = req.body;
  if (!userId || !groupId || !adminId)
    return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findUserById(adminId))) {
      return res.status(404).json("Invalid admin ID");
    }
    if (!(await queries.isAdmin(adminId, groupId))) {
      return res.status(403).json("You are not an admin of this group.");
    }
    if (!(await queries.isMember(userId, groupId))) {
      return res.status(400).json("User is not a member of this group.");
    }
    await queries.removeMember(adminId, groupId, userId);

    return res.status(200).json("Member was removed successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// make member an admin
const makeAdmin = async (req, res) => {
  const { userId, groupId, adminId } = req.body;
  if (!userId || !groupId || !adminId)
    return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findUserById(adminId))) {
      return res.status(404).json("Invalid admin ID");
    }
    if (!(await queries.isAdmin(adminId, groupId))) {
      return res.status(403).json("You are not an admin of this group.");
    }
    if (!(await queries.isMember(userId, groupId))) {
      return res.status(400).json("User is not a member of this group.");
    }
    if (await queries.isAdmin(userId, groupId)) {
      return res.status(400).json("User is already an admin of this group.");
    }
    await queries.makeAdmin(userId, groupId);
    return res.status(200).json("Member was made an admin successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// remove admin from member
const removeAdmin = async (req, res) => {
  const { userId, groupId, adminId } = req.body;
  if (!userId || !groupId || !adminId)
    return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await postQueries.findUserById(adminId))) {
      return res.status(404).json("Invalid admin ID");
    }
    if (!(await queries.isAdmin(adminId, groupId))) {
      return res.status(403).json("You are not an admin of this group.");
    }
    if (!(await queries.isMember(userId, groupId))) {
      return res.status(400).json("User is not a member of this group.");
    }
    await queries.removeAdmin(userId, groupId);
    return res.status(200).json("Admin was removed successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// join group
const joinGroup = async (req, res) => {
  const { userId, groupId } = req.body;
  if (!userId || !groupId) return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (await queries.isMember(userId, groupId)) {
      return res.status(400).json("User is already a member of this group.");
    }
    if(await queries.isGroupFull(groupId)) {
      return res.status(400).json("Group is full.");
    }
    if(group[0].visibility === "0") {
      return res.status(400).json("Group is private.");
    }
    await queries.addMember(userId, groupId);
    return res.status(200).json("Member was added successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// leave group
const leaveGroup = async (req, res) => {
  const { userId, groupId } = req.body;
  if (!userId || !groupId) return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await queries.isMember(userId, groupId))) {
      return res.status(400).json("User is not a member of this group.");
    }
    if (!(await queries.isAdminInGroup(userId, groupId))) {
      queries.changeCreatedBy(userId, groupId);
    }
    await queries.removeMember(userId, groupId, userId);
    return res.status(200).json("Member was removed successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

const changeCreatedBy = async (req, res) => {
  const { userId, groupId } = req.body;
  if (!userId || !groupId) return res.status(404).json("Empty fields");
  try {
    const group = await groupQueries.findGroupById(groupId);
    if (group.length == 0) {
      return res.status(404).json("Invalid group ID");
    }
    if (!(await postQueries.findUserById(userId))) {
      return res.status(404).json("Invalid user ID");
    }
    if (!(await queries.isMember(userId, groupId))) {
      return res.status(400).json("User is not a member of this group.");
    }
    if(!await queries.isAdmin(userId, groupId)) {
      return res.status(400).json("User is not an admin of this group.");
    }
    await queries.changeCreatedBy(userId, groupId);
    return res.status(200).json("createdBy was changed successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  addMember,
  removeMember,
  makeAdmin,  
  removeAdmin,
  joinGroup,
  leaveGroup,
  changeCreatedBy,
};
