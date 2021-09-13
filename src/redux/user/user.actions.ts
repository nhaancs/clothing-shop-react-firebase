import { User } from "../../models/user.model";
import { Action } from "../store";

export const USER_ACTION_SET_CURRENT_USER = "USER_ACTION_SET_CURRENT_USER";
export const setCurrentUserAction = (user?: User): Action<User> => {
    return ({type: USER_ACTION_SET_CURRENT_USER, payload: user})
}

export const USER_ACTION_GOOGLE_SIGN_IN_START = 'USER_ACTION_GOOGLE_SIGN_IN_START'
export const googleSignInStartAction = (): Action<User> => ({type: USER_ACTION_GOOGLE_SIGN_IN_START})

export const USER_ACTION_GOOGLE_SIGN_IN_SUCCESS = 'USER_ACTION_GOOGLE_SIGN_IN_SUCCESS'
export const googleSignInSuccessAction = (user: User): Action<User> => ({
    type: USER_ACTION_GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

export const USER_ACTION_GOOGLE_SIGN_IN_FAILURE = 'USER_ACTION_GOOGLE_SIGN_IN_FAILURE'
export const googleSignInFailureAction = (error: string): Action<User|string> => ({
    type: USER_ACTION_GOOGLE_SIGN_IN_FAILURE, 
    payload: error
})

interface EmailAndPassword {
    email: string
    password: string
}
export const USER_ACTION_EMAIL_SIGN_IN_START = 'USER_ACTION_EMAIL_SIGN_IN_START'
export const emailSignInStartAction = (loginInfo: EmailAndPassword): Action<EmailAndPassword> => ({
    type: USER_ACTION_EMAIL_SIGN_IN_START,
    payload: loginInfo
})

export const USER_ACTION_EMAIL_SIGN_IN_SUCCESS = 'USER_ACTION_EMAIL_SIGN_IN_SUCCESS'
export const emailSignInSuccessAction = (user: User): Action<User> => ({
    type: USER_ACTION_EMAIL_SIGN_IN_SUCCESS,
    payload: user
})

export const USER_ACTION_EMAIL_SIGN_IN_FAILURE = 'USER_ACTION_EMAIL_SIGN_IN_FAILURE'
export const emailSignInFailureAction = (error: string): Action<User|string> => ({
    type: USER_ACTION_EMAIL_SIGN_IN_FAILURE,
    payload: error
})