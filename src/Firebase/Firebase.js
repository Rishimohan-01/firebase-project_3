import { initializeApp } from "firebase/app";
import getAuth from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBC_MYwrZikd1-vTuXzbLBmP5br-gEuzDc",
  authDomain: "fir-project-3-68794.firebaseapp.com",
  projectId: "fir-project-3-68794",
  storageBucket: "fir-project-3-68794.appspot.com",
  messagingSenderId: "156285108510",
  appId: "1:156285108510:web:d8839edd87515d083e890f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export default auth;

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBC_MYwrZikd1-vTuXzbLBmP5br-gEuzDc",
//   authDomain: "fir-project-3-68794.firebaseapp.com",
//   projectId: "fir-project-3-68794",
//   storageBucket: "fir-project-3-68794.appspot.com",
//   messagingSenderId: "156285108510",
//   appId: "1:156285108510:web:d8839edd87515d083e890f",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };
