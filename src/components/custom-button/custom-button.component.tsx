import React from "react";

import './custom-button.styles.scss'

interface CustomButtonProps {
    isGoogleSignIn?: boolean
    [key: string]: any
}

const CustomButton = ({children, isGoogleSignIn, ...otherProps}: CustomButtonProps) => (
    <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>{children}</button>
)

export default CustomButton
