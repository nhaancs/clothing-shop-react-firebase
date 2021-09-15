import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { EmailAndPassword, emailSignInStartAction, googleSignInStartAction } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';


const mapDispathToProps = (dispatch: Dispatch) => {
    return {
        googleSignInStart: () => dispatch(googleSignInStartAction()),
        emailSignInStart: (email: string, password: string) => dispatch(emailSignInStartAction({email, password}))
    }
}

const connector = connect(null, mapDispathToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
interface SignInProps extends PropsFromRedux {}

const SignIn = ({emailSignInStart, googleSignInStart}: SignInProps) => {
    const [loginInfo, setLoginInfo] = useState<EmailAndPassword>({email: '', password: ''})
    const {email, password} = loginInfo

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target

        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput 
                    type="text"
                    name="email" 
                    label="Email" 
                    value={email}
                    handleChange={handleChange} 
                    required />
                <FormInput 
                    type="password"
                    name="password" 
                    label="Password" 
                    value={password} 
                    handleChange={handleChange} 
                    required />

                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton 
                        type='button' 
                        onClick={googleSignInStart} 
                        isGoogleSignIn
                        >Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default connector(SignIn)
