import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { CartItem } from "../../models/cart.model";
import { decreaseOrRemoveCartItem, removeCartItem, addCartItem } from "../../redux/cart/cart.actions";

import './checkout-item.styles.scss'

const mapDispatchToProps = (dispatch: Dispatch) => ({
    removeCartItem: (item: CartItem) => dispatch(removeCartItem(item)),
    decreaseOrRemoveCartItem: (item: CartItem) => dispatch(decreaseOrRemoveCartItem(item)),
    addCartItem: (item: CartItem) => dispatch(addCartItem(item))
}) 
const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface CheckoutItemProps extends PropsFromRedux {
    item: CartItem
}

const CheckoutItem = ({item, removeCartItem, decreaseOrRemoveCartItem, addCartItem}: CheckoutItemProps) => {
    const {imageUrl, name, quantity, price} = item
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt="item" />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => decreaseOrRemoveCartItem(item)}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addCartItem(item)}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => removeCartItem(item)}>&#10005;</div>
        </div>
    )
}

export default connector(CheckoutItem)
