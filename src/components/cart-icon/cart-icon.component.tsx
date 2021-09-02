import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import {ReactComponent as ShoppingIcon} from '../../assets/cart.svg'
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { RootState } from "../../redux/store";

import "./cart-icon.styles.scss"

const mapStateToProps = (state: RootState) => ({
    itemCount: selectCartItemsCount(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})
const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface CartIconProps extends PropsFromRedux {}

const CartIcon = ({toggleCartHidden, itemCount}: CartIconProps) => {
    return (
        <div className='cart-icon' onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

export default connector(CartIcon)