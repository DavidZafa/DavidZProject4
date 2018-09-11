import database, { firebase, googleAuthProvider as provider } from '../firebase/firebase';

export const login = (uid, displayName) => ({
  type: 'LOGIN',
  uid,
  displayName
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      const name = user.displayName ? user.displayName : user.email;
      database.ref(`users/${user.uid}`).once((snapshot) => {
        if(!snapshot.val()) {
          database.ref(`users/${user.uid}`).set({
            name,
            uid: user.uid,
            email: user.email,
            rooms: [],
            token
          });
        }
      });

      // ...
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      // ...
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
