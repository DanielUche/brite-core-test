/**
 * @file init-db.js
 * 1. Login to firebase
 * 2. Read json file containing payment logs
 * 3. Write json file containing payment details to the selected
 *    collection key
 *
 *          ==== List of Variables =====
 *           1.   process.env.COLLECTION_KEY
 *           2.   process.env.JSON_PATH
 *
 *          ======= Execute ======
 *   cd source_dir/src/ && node in.js
 *
 */

const { db, loginToFirebase } = require('./utils/firebase.util');
const data = require('../csvjson.json');

const collectionKey = 'payments'; // name of the collection


loginToFirebase().then(() => {
  if (data && (typeof data === 'object')) {
    Object.keys(data).forEach((docKey, index) => {
      db.collection(collectionKey).doc(docKey).set(data[docKey]).then(() => {
        process.stdout.write((index === 0) ? 'Writing Documents: .' : '.');
        if (index === (data.length - 1)) {
          console.log('\n\nDocuments successfully written!');
          process.exit(1);
        }
      })
        .catch((error) => {
          console.error(`Error writing document: ${docKey} `, error);
        });
    });
  }
}).catch((err) => {
  console.log(err);
});
