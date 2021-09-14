import { signInWithEmailAndPassword, signInWithPopup, UserCredential, User as FirebaseUser, createUserWithEmailAndPassword } from "@firebase/auth";
import { DocumentReference, DocumentSnapshot, getDoc } from "@firebase/firestore";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebase.utils";
import { User } from "../../models/user.model";
import { Action } from "../store";
import { EmailAndPassword, SignedUpUser, signInFailureAction, signInSuccessAction, signOutFailureAction, signOutSuccessAction, signUpFailureAction, SignUpInfo, signUpSuccessAction, USER_ACTION_CHECK_USER_SESSION, USER_ACTION_EMAIL_SIGN_IN_START, USER_ACTION_GOOGLE_SIGN_IN_START, USER_ACTION_SIGN_OUT_START, USER_ACTION_SIGN_UP_START, USER_ACTION_SIGN_UP_SUCCESS } from "./user.actions";

function* processFirebaseUser(user: FirebaseUser, additionalData?: any) {
    try {
        const userRef: DocumentReference<User> = yield call(createUserProfileDocument, user, additionalData)
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

function* signOut() {
    try {
        yield auth.signOut()
        yield put(signOutSuccessAction())
    } catch (error: any) {
        yield put(signOutFailureAction(error?.message))
    }
}

export function* onSignOutStartSaga() {
    yield takeLatest(USER_ACTION_SIGN_OUT_START, signOut)
}

function* signUp({payload}: Action<SignUpInfo>) {
    try {
        const userCredential: UserCredential = yield createUserWithEmailAndPassword(
            auth, 
            payload?.email as string,
            payload?.password as string,
        )

        yield put(signUpSuccessAction({
            firebaseUser: userCredential.user,
            displayName: payload?.displayName as string
        }))
    } catch (error: any) {
        yield put(signUpFailureAction(error?.message))
    }
}

export function* onSignUpStartSaga() {
    yield takeLatest(USER_ACTION_SIGN_UP_START, signUp)
}

function* signInAfterSignUp({payload}: Action<SignedUpUser>) {
    const {firebaseUser, displayName} = payload as SignedUpUser
    yield processFirebaseUser(firebaseUser, {displayName})
}

export function* onSignUpSuccessSaga() {
    yield takeLatest(USER_ACTION_SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStartSaga),
        call(onEmailSignInStartSaga),
        call(onCheckUserSessionSaga),
        call(onSignOutStartSaga),
        call(onSignUpStartSaga),
        call(onSignUpSuccessSaga),
    ])
}
