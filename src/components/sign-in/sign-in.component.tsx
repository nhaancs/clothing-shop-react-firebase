import React, { ReactNode } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle } from "../../firebase/firebase.utils";

import './sign-in.styles.scss'

interface SignInProps {

}

interface SignInState {
    email: string
    password: string
    [key: string]: string
}

class SignIn extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        this.setState({email: '', password: ''})
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target

        this.setState({[name]: value})
    }

    render(): ReactNode {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        label="Email" 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        required />
                    <FormInput 
                        name="password" 
                        label="Password" 
                        value={this.state.password} 
                        handleChange={this.handleChange} 
                        required />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
