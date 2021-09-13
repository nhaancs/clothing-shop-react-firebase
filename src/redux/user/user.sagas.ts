import { signInWithPopup, UserCredential } from "@firebase/auth";
import { DocumentReference, DocumentSnapshot, getDoc } from "@firebase/firestore";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { auth, createUserProfileDocument, googleProvider } from "../../firebase/firebase.utils";
import { User } from "../../models/user.model";
import { googleSignInFailureAction, googleSignInSuccessAction, USER_ACTION_GOOGLE_SIGN_IN_START } from "./user.actions";

export function* signInWithGoogle() {
    try {
        const user: UserCredential = yield signInWithPopup(auth, googleProvider)
        const userRef: DocumentReference<User> = yield call(createUserProfileDocument, user)
        const userSnapshot: DocumentSnapshot<User> = yield getDoc(userRef)
        yield put(googleSignInSuccessAction({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        } as User))
    } catch (error: any) {
        yield put(googleSignInFailureAction(error?.message))
    }
}

export function* onGoogleSignInStartSaga() {
    yield takeLatest(USER_ACTION_GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStartSaga),
    ])
}
