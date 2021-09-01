import { User } from "../../models/user.model";

export const ACTION_SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUser = (user: User|null) => ({type: ACTION_SET_CURRENT_USER, payload: user})