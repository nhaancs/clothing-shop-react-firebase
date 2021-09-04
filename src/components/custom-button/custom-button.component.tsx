import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

export interface CustomButtonProps {
    isGoogleSignIn?: boolean
    inverted?: boolean
    [key: string]: any
}

const CustomButton = ({
  children,
  ...otherProps
}: CustomButtonProps) => (
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton
