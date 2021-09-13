import { createUserWithEmailAndPassword } from "@firebase/auth";
import React, { ReactNode } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import './sign-up.styles.scss'

interface SignUpProps {

}

interface SignUpState {
    email: string
    password: string
    confirmPassword: string
    displayName: string
    [key: string]: string
}

class SignUp extends React.Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props)

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            displayName: ''
        }
    }

    handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const {displayName, email, password, confirmPassword} = this.state

        if (password !== confirmPassword) {
            alert("passwords don't match")
            return
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await createUserProfileDocument(userCredential, {displayName})

            this.setState({
                email: '',
                password: '',
                confirmPassword: '',
                displayName: ''
            })
        } catch (err) {
            console.error(err)
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target

        this.setState({[name]: value})
    }

    render(): ReactNode {
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="displayName" 
                        type="text" 
                        label="Display name" 
                        value={displayName} 
                        handleChange={this.handleChange} 
                        required />
                    <FormInput 
                        type="text"
                        name="email" 
                        label="Email" 
                        value={email} 
                        handleChange={this.handleChange} 
                        required />
                    <FormInput 
                        type="password"
                        name="password" 
                        label="Password" 
                        value={password} 
                        handleChange={this.handleChange} 
                        required />
                    <FormInput 
                        type="password"
                        name="confirmPassword" 
                        label="Confirm Password" 
                        value={confirmPassword} 
                        handleChange={this.handleChange} 
                        required />

                    <div className="buttons">
                        <CustomButton type="submit">Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp