import firebase from 'firebase'
export default function ({ store, redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      redirect('/')
    }
  })
}
