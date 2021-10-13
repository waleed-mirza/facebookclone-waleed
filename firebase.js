import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQRJToVCCuLxnZVhAP0mpQR_n9PAwCgcM",
  authDomain: "facebookclone-waleed.firebaseapp.com",
  projectId: "facebookclone-waleed",
  storageBucket: "facebookclone-waleed.appspot.com",
  messagingSenderId: "330584810201",
  appId: "1:330584810201:web:6a63d1397f6a041c23d4c8",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
