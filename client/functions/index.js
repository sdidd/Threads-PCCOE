/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.restrictSignup = functions.auth.user().onCreate((user) => {
  const emailDomain = user.email.split("@")[1];
  if (emailDomain !== "pccoepune.org") {
    // If the email domain is not 'pccoepune.org', delete the user account
    return admin.auth().deleteUser(user.uid)
        .then(() => {
          console.log("User deleted due to unauthorized domain:", user.email);
          return null;
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
  }
  return null;
});
