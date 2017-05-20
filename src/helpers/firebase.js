import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDdyHMOu98bpXF542vEK38gGTC_z9AFeR4',
  authDomain: 'vue-chalkack.firebaseapp.com',
  databaseURL: 'https://vue-chalkack.firebaseio.com',
  storageBucket: 'vue-chalkack.appspot.com',
  messagingSenderId: '123456789',
};

firebase.initializeApp(config);

export default firebase;
