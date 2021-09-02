import { onAuthStateChanged } from "@firebase/auth";
import { Unsubscribe } from "@firebase/util";
import { getDoc } from "firebase/firestore";
import React, { ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { User } from "./models/user.model";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SigninAndSignupPage from "./pages/signin-and-signup/signin-and-signup.component";
import { RootState } from "./redux/store";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const mapStateToProps = (state: RootState) => ({
  currentUser: selectCurrentUser(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentUser: (user: User | undefined) => dispatch(setCurrentUser(user)),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface AppProps extends PropsFromRedux {}

class App extends React.Component<AppProps> {
  unsubscribeFromAuth!: Unsubscribe;

  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const snapshot = await getDoc(userRef);
        this.props.setCurrentUser({
          id: snapshot.id,
          ...snapshot.data(),
        } as User);
      } else {
        this.props.setCurrentUser(undefined);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(): ReactNode {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            path="/signin"
            render={() =>
              this.props?.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SigninAndSignupPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default connector(App);
