import { CartItem } from "../../models/cart.model"
import { Action } from "../store"
import { CART_ACTION_ADD_ITEM, CART_ACTION_TOGGLE_HIDDEN } from "./cart.actions"
import { addItemToCart } from "./cart.utils"

interface CartState {
    hidden: boolean
    cartItems: CartItem[]
}

const INITIAL_STATE: CartState = {
    hidden: true,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action: Action<CartItem>) => {
    switch (action.type) {
        case CART_ACTION_TOGGLE_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case CART_ACTION_ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload as CartItem)
            }
        default:
            return state
    }
}

export default cartReducer