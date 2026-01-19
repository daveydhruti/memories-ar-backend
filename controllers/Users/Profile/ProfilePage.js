const queries = require("../../../crudOperations/Users/Profile/ProfilePage.js");
const { uploadImage, decode } = require("../../../functions/index.js");
const UUID = require("uuid-v4");

const getUserProfileData = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.getProfileData(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    2;
    console.log(err);
    return res.status(400).json(err);
  }
};

const getFriendNumber = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.getFriendNumber(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getPostNumber = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.getPostNumber(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getPersonalData = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.getPersonalData(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updateProfileData = async (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const bio = req.body.bio;
  // const profilePhoto = req.body.profilePhoto;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  // if (!firstName || !lastName || !bio) {
  //     return res.status(400).json({ error: ' firstName or lastName or bio or profilePhoto is not provided' });
  // }
  try {
    const result = await queries.updateProfileData(
      id,
      firstName,
      lastName,
      bio
      // profilePhoto
    );
    if (result) {
      return res.status(200).json("Profile Updated");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updatePersonalData = async (req, res) => {
  const id = req.body.id;
  const dob = req.body.dob;
  const countryCode = req.body.countryCode;
  const mobile = req.body.mobile;
  const gender = req.body.gender;
  // const address = req.body.address;
  // const city = req.body.city;
  // const state = req.body.state;
  // const country = req.body.country;
  const address = "";
  const city = "";
  const state = "";
  const country = "";
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  // if (!dob || !countryCode || !mobile || !gender || !address || !city || !state || !country) {
  //     return res.status(400).json({error: 'all fields are required'});
  // }
  try {
    const result = await queries.updatePersonalData(
      id,
      gender,
      mobile,
      dob,
      countryCode,
      address,
      city,
      state,
      country
    );
    if (result) {
      return res.status(200).json("Personal Data Updated");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const updatePFP = async (req, res) => {
  const id = req.body.id;
  let { profilePhoto } = req.body;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  if (!profilePhoto) {
    return res.status(400).json({ error: "profilePhoto is required" });
  }
  const uuid = UUID();

  // // testing 
  profilePhoto = require('../../../functions/image.js')
  // Decode the base64-encoded image string
  let imageUrl =  uploadImage(decode(profilePhoto), uuid);

  try {
    const result = await queries.updatePFP(imageUrl, id);
    if (result) {
      return res.status(200).json("PFP Updated");
    }
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const deletePFP = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.deletePFP(id);
    if (result) {
      return res.status(200).json("PFP Deleted");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deactivateAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.deactivateAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account Deactivated");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const activateAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.activateAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account Activated");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const BanAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.BanAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account Banned");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const UnBanAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.UnbanAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account UnBanned");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.deleteAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account Deleted");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const verifyAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.VerifyAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account Verified");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const unVerifyAccount = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.unVerifyAccount(id);
    if (result.affectedRows) {
      return res.status(200).json("Account Unverified");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const setAccountPrivate = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.setAccountPrivate(id);
    if (result.affectedRows) {
      return res.status(200).json("Private Account");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const setAccountPublic = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.setAccountPublic(id);
    if (result.affectedRows) {
      return res.status(200).json("Public Account");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getAccVisibility = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  try {
    const result = await queries.getAccVisibility(id);

    if (result) {
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  getUserProfileData,
  getPersonalData,
  getFriendNumber,
  updateProfileData,
  updatePersonalData,
  deactivateAccount,
  activateAccount,
  deleteAccount,
  getPostNumber,
  verifyAccount,
  unVerifyAccount,
  setAccountPrivate,
  setAccountPublic,
  BanAccount,
  UnBanAccount,
  updatePFP,
  deletePFP,
  getAccVisibility,
};
