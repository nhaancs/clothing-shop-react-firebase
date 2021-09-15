import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import "./App.css";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import HomePage from "./pages/home/home.component";
import ShopPage from "./pages/shop/shop.component";
import SigninAndSignupPage from "./pages/signin-and-signup/signin-and-signup.component";
import { RootState } from "./redux/store";
import { checkUserSessionAction } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const mapStateToProps = (state: RootState) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispathToProps = (dispatch: Dispatch) => ({
  checkUserSession: () => dispatch(checkUserSessionAction())
})

const connector = connect(mapStateToProps, mapDispathToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface AppProps extends PropsFromRedux {}

const App = ({checkUserSession, currentUser}: AppProps) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          path="/signin"
          render={(_) =>
            currentUser ? (
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

export default connector(App);
