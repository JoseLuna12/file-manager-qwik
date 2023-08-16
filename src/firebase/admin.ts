import * as admin from "firebase-admin";
import * as serviceAccount from "../../fb_admin_sdk.json";
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: "dashboard-blogs-app.appspot.com",
    // databaseURL: "https://dashboard-blogs-app.firebaseio.com",
  });
} catch (err) {
  console.log("firebase admin already initialized");
}

export default admin;
