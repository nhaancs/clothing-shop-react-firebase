import React, { lazy, Suspense, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import { Dispatch } from "redux";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import { GlobalStyles } from "./global.styles";
import { RootState } from "./redux/store";
import { checkUserSessionAction } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SigninAndSignupPage = lazy(() => import('./pages/signin-and-signup/signin-and-signup.component'));
const HomePage = lazy(() => import('./pages/home/home.component'))

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
      <GlobalStyles />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route 
              path="/signin"
              render={(_) => currentUser ? (<Redirect to="/" />) : (<SigninAndSignupPage />)}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default connector(App);
