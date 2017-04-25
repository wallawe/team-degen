import { ref, firebaseAuth } from './constants';

export function getCurrentUserInfo(uid) {

    return ref.child(`users/${uid}`).once('value', (snapshot) => {
        return snapshot;
    });
}

export function getUserSessions(uid) {

}

export function getCurrentUserId() {
    return firebaseAuth().currentUser.uid;
}
