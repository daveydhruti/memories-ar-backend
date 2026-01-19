const queries = require("../../crudOperations/Groups/group.js");
const postQueries = require("../../crudOperations/Posts/userPost");
const groupMemberQueries = require("../../crudOperations/Groups/groupMember");

// create group
const createGroup = async (req, res) => {
  const { userId, groupName } = req.body;
  let { visibility } = req.body;
  if (!userId || !groupName || groupName.split(" ").join("") === "")
    return res.status(404).json("Empty fields");
  if (!visibility) {
    visibility = "0";
  } else if (visibility !== "0" && visibility !== "1") {
    return res.status(400).json("Incorrect visibility value (0/1).");
  }
  try {
    if (!await postQueries.findUserById(userId)) {
      return res.status(404).json("Invalid user ID");
    }
    const group = await queries.createGroup(userId, groupName, visibility);
    await groupMemberQueries.addAdmin(userId, group.insertId);
    return res.status(200).json("Group was created successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// delete group
const deleteGroup = async (req, res) => {
  const { groupId, userId } = req.body;
  if (!groupId) return res.status(404).json("Empty fields");
  try {
    if (!await queries.findGroupById(groupId)) {
      return res.status(404).json("Invalid group ID");
    }
    if (!await postQueries.findUserById(userId)) {
      return res.status(404).json("Invalid user ID");
    }
    if (!await groupMemberQueries.isAdmin(userId, groupId)) {
      return res.status(403).json("You are not an admin of this group.");
    }
    await queries.deleteGroup(groupId);
    return res.status(200).json("Group was deleted successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
};

// edit group
const editGroup = async (req, res) => {
  const { groupId, userId, groupName, profile, visibility } = req.body
  if (!groupId) return res.status(404).json("Empty fields")
  if (!groupName && !profile && !visibility) return res.status(404).json("Empty fields")
  try {
    if (!await queries.findGroupById(groupId)) {
      return res.status(404).json("Invalid group ID");
    }
    if (!await postQueries.findUserById(userId)) {
      return res.status(404).json("Invalid user ID");
    }
    if (!await groupMemberQueries.isAdmin(userId, groupId)) {
      return res.status(403).json("You are not an admin/member of this group.");
    }
    let fields =[];
    let editGroupQuery = "UPDATE `groups` SET `updateTime` = CURRENT_TIMESTAMP, `updatedBy` = ?, ";
    let bool = false;
    fields.push(userId);
    if (groupName) {
      if (groupName.split(" ").join("") === "") {
        return res.status(400).json("Group name cannot be empty.");
      }
      editGroupQuery += `groupName = ?`;
      fields.push(groupName);
      bool = true;
    }
    if (profile) {
      if (bool) {
        editGroupQuery += `, profile = ?`;
      } else {
        editGroupQuery += `profile = ?`;
      }
      fields.push(profile);
      bool = true;
    }
    if (visibility) {
      if (visibility !== "0" && visibility !== "1") {
        return res.status(400).json("Incorrect visibility value (0/1).");
      }
      if (bool) {
        editGroupQuery += `, visibility = ?`;
      } else {
        editGroupQuery += `visibility = ?`;
      }
      fields.push(visibility);
    }
    editGroupQuery += ` WHERE groupId = ?`;
    fields.push(groupId);
    await queries.editGroup(editGroupQuery, fields);
    return res.status(200).json("Group was edited successfully.");
  } catch (error) {
    return res.status(400).json(error);
  }
}


module.exports = { createGroup, deleteGroup, editGroup };
