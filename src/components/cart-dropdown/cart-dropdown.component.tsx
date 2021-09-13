import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { CartItem } from "../../models/cart.model";
import { toggleCartHiddenAction } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { RootState } from "../../redux/store";
import CartItemCmp from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const mapStateToProps = createStructuredSelector<
  RootState,
  { cartItems: CartItem[] }
>({
  cartItems: selectCartItems,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps;

interface CartDropdownProps extends PropsFromRedux {}

const CartDropdown = ({ cartItems, history, dispatch }: CartDropdownProps) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((item) => <CartItemCmp key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>

    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHiddenAction());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

export default withRouter(connector(CartDropdown));
