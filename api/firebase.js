import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

// const {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
// } = require("firebase/app-check");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

//C1A658AA-BA69-4F16-B398-2EC107A7544C

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider("1234"),
//   isTokenAutoRefreshEnabled: true,
// });
const db = getFirestore(app);

export { db };
