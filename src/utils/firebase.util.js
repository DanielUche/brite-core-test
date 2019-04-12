/* eslint-disable no-console */
const firebase = require('@firebase/app').default;
require('@firebase/firestore');
require('firebase/auth');

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

let firebaseApp = firebase.initializeApp(config);
let db = firebaseApp.firestore();
const email = process.env.FIREBASE_AUTH_USER_EMAIL;
const password = process.env.FIREBASE_AUTH_USER_PASSWORD;

const createFirebaseUser = () => {
  console.log('Creating Firebase User');
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => res)
    .catch((createError) => {
      const createErrorCode = createError.code;
      const createErrorMessage = createError.message;
      console.log(createErrorCode, createErrorMessage);
    });
};

const loginFirebaseUser = () => {
  console.log('Logging in Firebase User');
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => res)
    .catch((loginError) => {
      const loginErrorCode = loginError.code;
      const loginErrorMessage = loginError.message;
      console.log(loginErrorCode, loginErrorMessage);
      if (loginErrorCode === 'auth/user-not-found') {
        createFirebaseUser(email, password);
      }
    });
};

const loginToFirebase = () => {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config);
    db = firebaseApp.firestore();
  }
  return new Promise(resolve => resolve(loginFirebaseUser(email, password)));
};

const firebaseCrud = {
  create: async (collection, data) => db.collection(collection).add(data),
  update: async (collection, data, index) => db.collection(collection).doc(`${index}`).set(data),
  delete: async (collection, index) => db.collection(collection).doc(`${index}`).delete(),
  read: async collection => db.collection(collection).get(),
};

module.exports = {
  loginToFirebase,
  db,
  firebaseCrud,
};
