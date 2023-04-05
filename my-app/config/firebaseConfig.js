import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth , GoogleAuthProvider} from 'firebase/auth';
import 'firebase/firestore';

const config = {
    "apiKey": "AIzaSyCo87-qBRJHu-g0mWlvAgBwG__-7L9yF00",
    "authDomain": "iscf-bd030.firebaseapp.com",
    "projectId": "iscf-bd030",
    "databaseURL": "https://iscf-bd030-default-rtdb.europe-west1.firebasedatabase.app/",
    "storageBucket": "iscf-bd030.appspot.com",
    "messagingSenderId": "729663094041",
    "appId": "1:729663094041:web:ac3454eb30833d65d61988",
    "measurementId": "G-LD4L5HJQ6T"
}

// Initialize Firebase
const app = initializeApp(config);
// Create an instance of the Google provider object
const googleProvider = new GoogleAuthProvider();
// Create an instance of the Firebase Auth object
const authGoogle = getAuth(app);

export { app, authGoogle, googleProvider };