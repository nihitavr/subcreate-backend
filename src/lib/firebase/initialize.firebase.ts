import * as admin from 'firebase-admin';

const app = admin.initializeApp({
  credential: admin.credential.cert('subcreate-firebase-adminsdk.json'),
  databaseURL: 'https://subcreate-default-rtdb.firebaseio.com',
});

export const firebaseAuth = admin.auth(app);
