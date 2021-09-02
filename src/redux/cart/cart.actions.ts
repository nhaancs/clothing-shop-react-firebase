import { CartItem } from "../../models/cart.model";
import { Action } from "../store";

export const CART_ACTION_TOGGLE_HIDDEN = "CART_ACTION_TOGGLE_HIDDEN";
export const toggleCartHidden = (): Action<CartItem> => {
    return {type: CART_ACTION_TOGGLE_HIDDEN}
}

export const CART_ACTION_ADD_ITEM = "CART_ACTION_ADD_ITEM";
export const addCartItem = (item: CartItem): Action<CartItem> => {
    return { type: CART_ACTION_ADD_ITEM, payload: item};
}