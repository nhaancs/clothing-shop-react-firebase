import React from "react";
import { CartItem } from "../../models/cart.model";

import './cart-item.styles.scss'

interface CartItemProps {
    item: CartItem
}

const CartItemCmp = ({item: {imageUrl, price, name, quantity}}: CartItemProps) => (
    <div className='cart-item'>
        <img src={imageUrl} alt="item" />
        <div className='item-details'>
            <div className='name'>{name}</div> 
            <div className='price'>{quantity} x ${price}</div>
        </div>
    </div>
)

export default React.memo(CartItemCmp);