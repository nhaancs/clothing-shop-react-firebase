import { Action } from "../store"
import { ACTION_TOGGLE_CART_HIDDEN } from "./cart.actions"

interface CartState {
    hidden: boolean
}

const INITIAL_STATE: CartState = {
    hidden: true
}

const cartReducer = (state = INITIAL_STATE, action: Action<any>) => {
    switch (action.type) {
        case ACTION_TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            return state
    }
}

export default cartReducer