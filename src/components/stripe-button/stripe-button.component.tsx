import React from "react";
import StripeCheckout from "react-stripe-checkout";

import './stripe-button.styles.scss'

interface StripeButtonProps {
    price: number
}

const StripeCheckoutButton = ({price}: StripeButtonProps) => {
    const stripePrice = price * 100
    const publishableKey = 'pk_test_sXYSHXVSeMMOdvtv1Vqixk7g00k8YxQI10'
    const onToken = (token: any) => {
        console.log(token)
        alert('Payment successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Clothing shop'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={stripePrice}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton