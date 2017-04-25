import { ref, firebaseAuth } from './constants';

export function getCurrentUserInfo(uid) {
    return ref.child(`users/${uid}`).once('value', (data) => {
        return data;
    });
}

export function getUserSessions(uid) {

}

// export function getRunningTotal(uid) {
//     return ref.child(`users/${uid}/total`).once('value', (data) => {
//         return data;
//     });
// }

export function getCurrentUserId() {
    return firebaseAuth().currentUser.uid;
}
