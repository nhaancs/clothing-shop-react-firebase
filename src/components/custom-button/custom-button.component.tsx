import React from "react";

import './custom-button.styles.scss'

interface CustomButtonProps {
    isGoogleSignIn?: boolean
    inverted?: boolean
    [key: string]: any
}

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}: CustomButtonProps) => (
  <button
    className={`
        ${inverted ? "inverted" : ""} 
        ${isGoogleSignIn ? "google-sign-in" : ""} 
        custom-button
    `}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton
