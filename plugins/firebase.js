import firebase from 'firebase'
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDwlR0m0kdTC_M8n_wwYMzeNPy3v1akEgQ',
    authDomain: 'blog-418a7.firebaseapp.com',
    databaseURL: 'https://blog-418a7.firebaseio.com',
    projectId: 'blog-418a7',
    storageBucket: 'blog-418a7.appspot.com',
    messagingSenderId: '576342405060',
    appId: '1:576342405060:web:11bc23dc16f6e4e8363e91',
    measurementId: 'G-F39M1PK7NQ'
  })
}

export default firebase
