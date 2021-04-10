import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCod28-HhBmXCV01J3BRYWZvC86XUHNk9Y',
  authDomain: 'todoapp-60538.firebaseapp.com',
  projectId: 'todoapp-60538',
  storageBucket: 'todoapp-60538.appspot.com',
  messagingSenderId: '387279418138',
  appId: '1:387279418138:web:2d8e8e116641d365acf2a3',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export { db };
