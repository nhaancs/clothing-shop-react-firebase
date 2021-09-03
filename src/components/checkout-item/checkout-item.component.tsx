import React from "react";
import { CartItem } from "../../models/cart.model";

import './checkout-item.styles.scss'

interface CheckoutItemProps {
    item: CartItem
}

const CheckoutItem = ({item: {imageUrl, name, quantity, price}}: CheckoutItemProps) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt="item" />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>
        <div className='remove-button'>&#10005;</div>
    </div>
)

export default CheckoutItem
