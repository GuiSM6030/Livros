import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAj7YxDi9lXf_u_wvMHQCXgPP8zPVTLbDE",
  authDomain: "projeto-2713d.firebaseapp.com",
  projectId: "projeto-2713d",
  storageBucket: "projeto-2713d.firebasestorage.app",
  messagingSenderId: "181100428160",
  appId: "1:181100428160:web:41eda7e3b107272ff91f65",
  measurementId: "G-VZ0KDJRPEP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;