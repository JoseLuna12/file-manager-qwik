import * as admin from "firebase-admin";
import * as serviceAccount from "../../fb_admin_sdk.json";
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
} catch (err) {
  console.log("firebase admin already initialized");
}

export default admin;
