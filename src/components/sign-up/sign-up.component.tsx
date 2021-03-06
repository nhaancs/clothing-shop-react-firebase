import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { SignUpInfo, signUpStartAction } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUpStart: (signUpInfo: SignUpInfo) =>
    dispatch(signUpStartAction(signUpInfo)),
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface SignUpProps extends PropsFromRedux {}

const SignUp = ({ signUpStart }: SignUpProps) => {
  const [signUpInfo, setSignUpInfo] = useState<SignUpInfo & { confirmPassword: string }>({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const { displayName, email, password, confirmPassword } = signUpInfo;

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ email, password, displayName });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSignUpInfo({ 
        ...signUpInfo,
        [name]: value 
    });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          label="Display name"
          value={displayName}
          handleChange={handleChange}
          required
        />
        <FormInput
          type="text"
          name="email"
          label="Email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          value={password}
          handleChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          handleChange={handleChange}
          required
        />

        <div className="buttons">
          <CustomButton type="submit">Sign Up</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default connector(SignUp);
