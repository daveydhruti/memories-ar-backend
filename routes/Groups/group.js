const express = require("express");
const router = express.Router();
const {
  createGroup,
  editGroup,
  deleteGroup,
} = require("../../controllers/Groups/group");

//route for create group
router.post("/create", createGroup);

//route for edit group
router.patch("/edit", editGroup);

//route for delete group
router.delete("/delete", deleteGroup);

module.exports = router;
