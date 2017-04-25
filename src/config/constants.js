import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDksENPHKjLTuGO_3aZOnrQqcpsC3wpV5o",
    authDomain: "teamdegen-2dfd6.firebaseapp.com",
    databaseURL: "https://teamdegen-2dfd6.firebaseio.com",
    projectId: "teamdegen-2dfd6",
    storageBucket: "teamdegen-2dfd6.appspot.com",
    messagingSenderId: "606552762144"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

// ref.child(`users/${currentUser.uid}`).once('value', (snapshot) => {
//     email = snapshot.val().info.email;
//     uid = currentUser.uid;
// });
