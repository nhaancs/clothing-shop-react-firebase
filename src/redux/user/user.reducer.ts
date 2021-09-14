import { User } from "../../models/user.model"
import { Action } from "../store"
import { USER_ACTION_SIGN_IN_FAILURE, USER_ACTION_SIGN_IN_SUCCESS, USER_ACTION_SIGN_OUT_FAILURE, USER_ACTION_SIGN_OUT_SUCCESS, USER_ACTION_SIGN_UP_FAILURE } from "./user.actions"


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
        case USER_ACTION_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload as User,
                error: undefined
            }
        case USER_ACTION_SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: undefined,
                error: undefined
            }
        case USER_ACTION_SIGN_IN_FAILURE:
        case USER_ACTION_SIGN_OUT_FAILURE:
        case USER_ACTION_SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload as string
            }
        default:
            return state
    }
}

export default userReducer