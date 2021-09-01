import { User } from "../../models/user.model"
import { Action } from "../store"
import { ACTION_SET_CURRENT_USER } from "./user.actions"

interface UserState {
    currentUser: User|null
}

const INITIAL_STATE: UserState = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action: Action<User>) => {
    switch (action.type) {
        case ACTION_SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
            break
        default:
            return state
    }
}

export default userReducer