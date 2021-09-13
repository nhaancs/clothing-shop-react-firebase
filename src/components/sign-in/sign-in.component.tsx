import { signInWithEmailAndPassword } from "firebase/auth";
import React, { ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { auth } from "../../firebase/firebase.utils";
import { googleSignInStartAction } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';


const mapDispathToProps = (dispatch: Dispatch) => {
    return {
        googleSignInStart: () => dispatch(googleSignInStartAction())
    }
}

const connector = connect(null, mapDispathToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
interface SignInProps extends PropsFromRedux {}

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

    handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        const {email, password} = this.state

        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target

        this.setState({[name]: value})
    }

    render(): ReactNode {
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form className='sign-in-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text"
                        name="email" 
                        label="Email" 
                        value={this.state.email}
                        handleChange={this.handleChange} 
                        required />
                    <FormInput 
                        type="password"
                        name="password" 
                        label="Password" 
                        value={this.state.password} 
                        handleChange={this.handleChange} 
                        required />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton 
                            type='button' 
                            onClick={this.props.googleSignInStart} 
                            isGoogleSignIn
                            >Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default connector(SignIn)
