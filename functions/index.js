const admin = require("firebase-admin");
require("dotenv").config();
// Initialize the Firebase Admin SDK
const serviceAccount = require("./admin.json");

const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle newlines
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
  }),
  // Optional: Add other config
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});
const bucket = admin.storage().bucket();

const decode = (photo) => {
  photo = Buffer.from(photo, "base64");

  // Write the image file to disk
  fs.writeFile("image.jpg", photo, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error writing image file");
    } else {
      console.log("Image file saved successfully");
    }
  });
  return photo
}

const uploadImage = (base64EncodedImageString, uuid) => {
  
  const file = bucket.file(`${uuid}.jpg`);
  // Convert the base64-encoded image string to a Buffer
  const imageBuffer = Buffer.from(base64EncodedImageString, "base64");

  // Create a write stream to Firebase Storage
  const stream = file.createWriteStream({
    metadata: {
      contentType: "image/jpeg",
    },
  });

  stream.on("error", (err) => {
    console.error(err);
  });

  stream.on("finish", () => {
    console.log("Image uploaded successfully");
  });

  // Write the image buffer to Firebase Storage
  stream.end(imageBuffer);

  const config = {
    action: "read",
    expires: "03-01-2500",
  };

  file.getSignedUrl(config, (err, url) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  const downloadUri  = process.env.FIREBASE_STORAGE_LINK
  let imageUrl1 = downloadUri + uuid + ".jpg" + "?alt=media&token=" + "1";
  console.log("Image download URL:", imageUrl1);
  return imageUrl1
  
};

module.exports = { uploadImage, decode };