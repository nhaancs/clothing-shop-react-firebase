import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CartItem } from "../../models/cart.model";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { RootState } from "../../redux/store";
import CartItemCmp from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";

import './cart-dropdown.styles.scss'

const mapStateToProps = createStructuredSelector<RootState, {cartItems: CartItem[]}>({
  cartItems: selectCartItems
})
const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

interface CartDropdownProps extends PropsFromRedux {}

const CartDropdown = ({ cartItems }: CartDropdownProps) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((item) => (
        <CartItemCmp key={item.id} item={item} />
      ))}
    </div>

    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

export default connector(CartDropdown)