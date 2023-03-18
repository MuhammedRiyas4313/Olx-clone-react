import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbRg3MJIoNkU2DF29A0o3_yeVfED74oDk",
    authDomain: "olx-clone-88fd2.firebaseapp.com",
    projectId: "olx-clone-88fd2",
    storageBucket: "olx-clone-88fd2.appspot.com",
    messagingSenderId: "537228538928",
    appId: "1:537228538928:web:78bf187ccdd1b487b869f5",
    measurementId: "G-FGQQWE6VB2"
  };

export default firebase.initializeApp(firebaseConfig)