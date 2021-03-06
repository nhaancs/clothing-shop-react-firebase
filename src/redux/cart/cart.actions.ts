import { CartItem } from "../../models/cart.model";
import { Action } from "../store";

export const CART_ACTION_TOGGLE_HIDDEN = "CART_ACTION_TOGGLE_HIDDEN";
export const toggleCartHiddenAction = (): Action<CartItem> => {
    return {type: CART_ACTION_TOGGLE_HIDDEN}
}

export const CART_ACTION_ADD_ITEM = "CART_ACTION_ADD_ITEM";
export const addCartItemAction = (item: CartItem): Action<CartItem> => {
    return { type: CART_ACTION_ADD_ITEM, payload: item};
}

export const CART_ACTION_REMOVE_ITEM = "CART_ACTION_REMOVE_ITEM";
export const removeCartItemAction = (item: CartItem): Action<CartItem> => {
    return { type: CART_ACTION_REMOVE_ITEM, payload: item};
}

export const CART_ACTION_DECREASE_OR_REMOVE_ITEM = "CART_ACTION_DECREASE_OR_REMOVE_ITEM";
export const decreaseOrRemoveCartItemAction = (item: CartItem): Action<CartItem> => {
    return { type: CART_ACTION_DECREASE_OR_REMOVE_ITEM, payload: item};
}

export const CART_ACTION_CLEAR_CART= "CART_ACTION_CLEAR_CART";
export const clearCartAction = (): Action<void> => {
    return {type: CART_ACTION_CLEAR_CART}
}