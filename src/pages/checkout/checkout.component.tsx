import React from "react";
import { connect, ConnectedProps } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";
import { RootState } from "../../redux/store";

import './checkout.styles.scss'

const mapStateToProp = (state: RootState) => ({
    cartItems: selectCartItems(state),
    cartTotal: selectCartTotal(state)
})

const connector = connect(mapStateToProp)

type PropsFromRedux = ConnectedProps<typeof connector>

interface CheckoutProps extends PropsFromRedux {}

const CheckoutPage = ({cartItems, cartTotal}: CheckoutProps) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quanity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(item => <CheckoutItem key={item.id} item={item} />)
        }

        <div className="total">
            <span>TOTAL: ${cartTotal} </span>
        </div>

        <div className='test-warning'>
            *Please the following test credit cart for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/30 - CVV: 123
        </div>

        <StripeCheckoutButton price={cartTotal} />
    </div>
)

export default connector(CheckoutPage)