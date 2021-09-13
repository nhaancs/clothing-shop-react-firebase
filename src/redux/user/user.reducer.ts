import { User } from "../../models/user.model"
import { Action } from "../store"
import { USER_ACTION_EMAIL_SIGN_IN_FAILURE, USER_ACTION_EMAIL_SIGN_IN_SUCCESS, USER_ACTION_GOOGLE_SIGN_IN_FAILURE, USER_ACTION_GOOGLE_SIGN_IN_SUCCESS } from "./user.actions"

interface UserState {
    currentUser?: User
    error?: string
}

const INITIAL_STATE: UserState = {
    currentUser: undefined,
    error: undefined
}

const userReducer = (state = INITIAL_STATE, action: Action<User|string>): UserState => {
    switch (action.type) {
        case USER_ACTION_GOOGLE_SIGN_IN_SUCCESS:
        case USER_ACTION_EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload as User,
                error: undefined
            }
        case USER_ACTION_GOOGLE_SIGN_IN_FAILURE:
        case USER_ACTION_EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                currentUser: undefined, 
                error: action.payload as string
            }
        default:
            return state
    }
}

export default userReducer