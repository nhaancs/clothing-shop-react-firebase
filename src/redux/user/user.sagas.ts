import { signInWithEmailAndPassword, signInWithPopup, UserCredential, User as FirebaseUser } from "@firebase/auth";
import { DocumentReference, DocumentSnapshot, getDoc } from "@firebase/firestore";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils";
import { User } from "../../models/user.model";
import { Action } from "../store";
import { EmailAndPassword, signInFailureAction, signInSuccessAction, USER_ACTION_CHECK_USER_SESSION, USER_ACTION_EMAIL_SIGN_IN_START, USER_ACTION_GOOGLE_SIGN_IN_START } from "./user.actions";

function* processFirebaseUser(user: FirebaseUser) {
    try {
        const userRef: DocumentReference<User> = yield call(createUserProfileDocument, user)
        const userSnapshot: DocumentSnapshot<User> = yield getDoc(userRef)
        yield put(signInSuccessAction({
            id: userSnapshot.id,
            ...userSnapshot.data(),
        } as User))
    } catch (error: any) {
        yield put(signInFailureAction(error?.message))
    }
}

function* signInWithGoogle() {
    try {
        const userCredential: UserCredential = yield signInWithPopup(auth, googleProvider)
        yield processFirebaseUser(userCredential.user)
    } catch (error: any) {
        yield put(signInFailureAction(error?.message))
    }
}

export function* onGoogleSignInStartSaga() {
    yield takeLatest(USER_ACTION_GOOGLE_SIGN_IN_START, signInWithGoogle)
}

function* signInWithEmail({payload}: Action<EmailAndPassword>) {
    try {
        const userCredential: UserCredential = yield signInWithEmailAndPassword(auth, payload?.email as string, payload?.password as string)
        yield processFirebaseUser(userCredential.user)
    } catch (error: any) {
        yield put(signInFailureAction(error?.message))
    }
}

export function* onEmailSignInStartSaga() {
    yield takeLatest(USER_ACTION_EMAIL_SIGN_IN_START, signInWithEmail)
}

function* checkUserSession() {
    try {
        const firebaseUser: FirebaseUser = yield getCurrentUser();
        if (!firebaseUser) {
            return
        }
        yield processFirebaseUser(firebaseUser)
    } catch (error: any) {
        yield put(signInFailureAction(error?.message))
    }
}

export function* onCheckUserSessionSaga() {
    yield takeLatest(USER_ACTION_CHECK_USER_SESSION, checkUserSession)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStartSaga),
        call(onEmailSignInStartSaga),
        call(onCheckUserSessionSaga),
    ])
}
