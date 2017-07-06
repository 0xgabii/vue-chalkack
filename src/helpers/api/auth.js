import firebase from '../firebase';

const database = firebase.database();

const providers = {
  facebook: new firebase.auth.FacebookAuthProvider(),
  google: new firebase.auth.GoogleAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

const returnUserObj = ({
  displayName,
  email,
  photoURL,
  providerData,
}) => ({
  displayName: displayName || 'UnknownUser',
  photoURL,
  email: email || providerData[0].email,
  providerInfo: providerData[0],
});

export default {
  signIn({ email, pwd }) {
    return firebase.auth().signInWithEmailAndPassword(email, pwd);
  },
  signUp({ email, pwd }) {
    return firebase.auth().createUserWithEmailAndPassword(email, pwd);
  },
  signInWithProvider(providerName) {
    firebase.auth().signInWithRedirect(providers[providerName]);
  },
  signOut() {
    return firebase.auth().signOut();
  },
  setUser(user) {
    // find user in database from uid
    const userInDatabase = database.ref(`users/${user.uid}`);
    // save userData to database
    userInDatabase.set(returnUserObj(user));
    // return Promise (get userData)
    return userInDatabase.once('value');
  },
  updateUser(user) {
    // find currentUser
    const currentUser = firebase.auth().currentUser;
    // return Promise (update user)
    return currentUser.updateProfile(user);
  },
};
