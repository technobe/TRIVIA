// import { initializeApp } from "firebase/app";
// import 'firebase/auth';


// const firebaseConfig = {
//   apiKey: "AIzaSyBtWemux-KMdmBpRS-j-POpWosaazO269M",
//   authDomain: "trivia-7baac.firebaseapp.com",
//   projectId: "trivia-7baac",
//   storageBucket: "trivia-7baac.appspot.com",
//   messagingSenderId: "282614440108",
//   appId: "1:282614440108:web:ffccfc8b0de4506b5cff09"
// };


// export const auth = firebase.auth();

// export const app = initializeApp(firebaseConfig);

////////////////////////////////////////////////////////////
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtWemux-KMdmBpRS-j-POpWosaazO269M",
  authDomain: "trivia-7baac.firebaseapp.com",
  projectId: "trivia-7baac",
  storageBucket: "trivia-7baac.appspot.com",
  messagingSenderId: "282614440108",
  appId: "1:282614440108:web:ffccfc8b0de4506b5cff09"
};

export const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);
export const db = getFirestore(app);
// const auth = getAuth(app);

// export { auth };
