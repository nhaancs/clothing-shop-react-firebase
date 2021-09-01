import { onAuthStateChanged } from "@firebase/auth";
import { Unsubscribe } from "@firebase/util";
import { getDoc } from "firebase/firestore";
import React, { Dispatch, ReactNode } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { User } from "./models/user.model";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SigninAndSignupPage from "./pages/signin-and-signup/signin-and-signup.component";
import { Action } from "./redux/store";
import { setCurrentUser } from "./redux/user/user.actions";

interface AppProps {
  setCurrentUser: (user: User | null) => void;
  currentUser: User
}

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
        this.props.setCurrentUser(null);
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
          <Route path="/signin" render={() => this.props?.currentUser ? (<Redirect to='/' />) : (<SigninAndSignupPage />)} />
        </Switch>
      </div>
    );
  }
}

const mapStatetoProps = (state: any) => ({currentUser: state?.user?.currentUser})
const mapDispatchToProps = (dispatch: Dispatch<Action<User | null>>) => ({
  setCurrentUser: (user: User | null) => dispatch(setCurrentUser(user)),
});
export default connect(mapStatetoProps, mapDispatchToProps)(App);
