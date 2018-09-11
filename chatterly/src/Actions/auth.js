import database, {firebase, googleAuthProvider as provider} from '../firebase/firebase'

export const login = (uid) =({
  type: 'LOGIN',

  export const startLogin = () => {
    return () => {
      return firebase.auth().signInWithPopup(googleAuthProvider)

      return firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken

        var user = result.user
        database.ref('users').once('value', (snapshot) => {
          const users = []
          snapshot.forEach((childSnapshot) => {
            users.push({childSnapshot.value()})
          })
        })

          if(!users.find((u) => u.id == user.uid)) {
            database.ref('users').push({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              rooms: [],
              token
            })
          }
        })

      }).catch(function(error) {
        var errorCode = error.errorCode
        var errorMessage = error.errorMessage
        var email = error.email
        var credential = error.credential
      })
  }
}
