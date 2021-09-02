import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import {ReactComponent as ShoppingIcon} from '../../assets/cart.svg'
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss"

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})
const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface CartIconProps extends PropsFromRedux {}

const CartIcon = (props: CartIconProps) => {
    return (
        <div className='cart-icon' onClick={props.toggleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>0</span>
        </div>
    )
}

export default connector(CartIcon)