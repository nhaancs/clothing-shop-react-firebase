import { User } from "../../models/user.model"
import { Action } from "../store"
import { USER_ACTION_SET_CURRENT_USER } from "./user.actions"

interface UserState {
    currentUser: User|undefined
}

const INITIAL_STATE: UserState = {
    currentUser: undefined
}

const userReducer = (state = INITIAL_STATE, action: Action<User>) => {
    switch (action.type) {
        case USER_ACTION_SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}

export default userReducer