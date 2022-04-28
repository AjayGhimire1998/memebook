
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDz-H_4azC5_YDKSE8p2iRtSk_AlNLT2rs",
  authDomain: "memebook-7734f.firebaseapp.com",
  projectId: "memebook-7734f",
  storageBucket: "memebook-7734f.appspot.com",
  messagingSenderId: "1063448324089",
  appId: "1:1063448324089:web:b00101765fef43891b7f28"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);