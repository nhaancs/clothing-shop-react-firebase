import { User as FirebaseUser } from "@firebase/auth";
import { User } from "../../models/user.model";
import { Action } from "../store";

export const USER_ACTION_GOOGLE_SIGN_IN_START = 'USER_ACTION_GOOGLE_SIGN_IN_START'
export const googleSignInStartAction = (): Action<User> => ({type: USER_ACTION_GOOGLE_SIGN_IN_START})

export interface EmailAndPassword {
    email: string
    password: string
}
export const USER_ACTION_EMAIL_SIGN_IN_START = 'USER_ACTION_EMAIL_SIGN_IN_START'
export const emailSignInStartAction = (loginInfo: EmailAndPassword): Action<EmailAndPassword> => ({
    type: USER_ACTION_EMAIL_SIGN_IN_START,
    payload: loginInfo
})

export const USER_ACTION_SIGN_IN_SUCCESS = 'USER_ACTION_SIGN_IN_SUCCESS'
export const signInSuccessAction = (user: User): Action<User> => ({
    type: USER_ACTION_SIGN_IN_SUCCESS,
    payload: user
})

export const USER_ACTION_SIGN_IN_FAILURE = 'USER_ACTION_SIGN_IN_FAILURE'
export const signInFailureAction = (error: string): Action<User|string> => ({
    type: USER_ACTION_SIGN_IN_FAILURE,
    payload: error
})

export const USER_ACTION_CHECK_USER_SESSION = 'USER_ACTION_CHECK_USER_SESSION'
export const checkUserSessionAction = (): Action<void> => ({
    type: USER_ACTION_CHECK_USER_SESSION
})

export const USER_ACTION_SIGN_OUT_START = 'USER_ACTION_SIGN_OUT_START'
export const signOutStartAction = (): Action<void> => ({
    type: USER_ACTION_SIGN_OUT_START
})

export const USER_ACTION_SIGN_OUT_SUCCESS = 'USER_ACTION_SIGN_OUT_SUCCESS'
export const signOutSuccessAction = (): Action<void> => ({
    type: USER_ACTION_SIGN_OUT_SUCCESS
})

export const USER_ACTION_SIGN_OUT_FAILURE = 'USER_ACTION_SIGN_OUT_FAILURE'
export const signOutFailureAction = (error: string): Action<string> => ({
    type: USER_ACTION_SIGN_OUT_FAILURE,
    payload: error
})

export interface SignUpInfo {
    email: string
    password: string
    displayName: string
}
export const USER_ACTION_SIGN_UP_START = 'USER_ACTION_SIGN_UP_START'
export const signUpStartAction = (signUpInfo: SignUpInfo): Action<SignUpInfo> => ({
    type: USER_ACTION_SIGN_UP_START,
    payload: signUpInfo
})

export interface SignedUpUser {
    firebaseUser: FirebaseUser,
    displayName: string
}
export const USER_ACTION_SIGN_UP_SUCCESS = 'USER_ACTION_SIGN_UP_SUCCESS'
export const signUpSuccessAction = (signedUpUser: SignedUpUser): Action<SignedUpUser> => ({
    type: USER_ACTION_SIGN_UP_SUCCESS,
    payload: signedUpUser
})

export const USER_ACTION_SIGN_UP_FAILURE = 'USER_ACTION_SIGN_UP_FAILURE'
export const signUpFailureAction = (error: string): Action<string> => ({
    type: USER_ACTION_SIGN_UP_FAILURE,
    payload: error
})