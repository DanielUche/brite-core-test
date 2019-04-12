/* eslint-disable no-console */
const firebase = require('@firebase/app').default;
require('@firebase/firestore');
require('firebase/auth');

const config = {
  apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.VUE_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.VUE_APP_FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}`,
};

let firebaseApp = firebase.initializeApp(config);
let DB = firebaseApp.firestore();
const email = process.env.VUE_APP_FIREBASE_AUTH_USER_EMAIL;
const password = process.env.VUE_APP_FIREBASE_AUTH_USER_PASSWORD;

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

export const loginToFirebase = () => {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config);
    DB = firebaseApp.firestore();
  }
  return new Promise(resolve => resolve(loginFirebaseUser(email, password)));
};

export const firebaseCrud = {
  create: async (collection, data) => DB.collection(collection).add(data),
  update: async (collection, data, index) => DB.collection(collection).doc(`${index}`).set(data),
  delete: async (collection, index) => DB.collection(collection).doc(`${index}`).delete(),
  read: async collection => DB.collection(collection).get(),
};

export const db = DB;
