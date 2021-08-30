import React from "react";

import './custom-button.styles.scss'

interface CustomButtonProps {
    
    [key: string]: any
}

const CustomButton = ({children, ...otherProps}: CustomButtonProps) => (
    <button className='custom-button' {...otherProps}>{children}</button>
)

export default CustomButton
