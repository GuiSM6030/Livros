// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj7YxDi9lXf_u_wvMHQCXgPP8zPVTLbDE",
  authDomain: "projeto-2713d.firebaseapp.com",
  projectId: "projeto-2713d",
  storageBucket: "projeto-2713d.firebasestorage.app",
  messagingSenderId: "181100428160",
  appId: "1:181100428160:web:41eda7e3b107272ff91f65",
  measurementId: "G-VZ0KDJRPEP"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
