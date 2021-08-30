import React from "react";

import './form-input.styles.scss'

interface FormInputProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label: string
    [key: string]: any
}

const FormInput = ({handleChange, label, ...otherProps}: FormInputProps) => (

    <div className='group'>
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {
            label ? 
                (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>) : 
                null
        }
    </div>
)

export default FormInput