import { Action } from "../store";

export const ACTION_TOGGLE_CART_HIDDEN = 'TOGGLE_CART_HIDDEN'
export const toggleCartHidden = (): Action<any> => {
    return {type: ACTION_TOGGLE_CART_HIDDEN}
}