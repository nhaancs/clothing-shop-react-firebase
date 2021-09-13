import { User } from "../../models/user.model";
import { Action } from "../store";

export const USER_ACTION_SET_CURRENT_USER = "USER_ACTION_SET_CURRENT_USER";
export const setCurrentUserAction = (user: User|undefined): Action<User|undefined> => {
    return ({type: USER_ACTION_SET_CURRENT_USER, payload: user})
}