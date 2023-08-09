import * as admin from "firebase-admin";
import * as serviceAccount from "../../fb_admin_sdk.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
