import { User } from "../../models/user.model";
import { Action } from "../store";

export const ACTION_SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUser = (user: User|undefined): Action<User|undefined> => {
    return ({type: ACTION_SET_CURRENT_USER, payload: user})
}