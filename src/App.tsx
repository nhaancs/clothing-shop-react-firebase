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
import CheckoutPage from "./pages/checkout/checkout.component";
import HomePage from "./pages/home/home.component";
import ShopPage from "./pages/shop/shop.component";
import SigninAndSignupPage from "./pages/signin-and-signup/signin-and-signup.component";
import { RootState } from "./redux/store";
import { setCurrentUserAction } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const mapStateToProps = (state: RootState) => ({
  currentUser: selectCurrentUser(state),
  // collections: selectCollections(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentUser: (user: User | undefined) => dispatch(setCurrentUserAction(user)),
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
      // addCollectionAndDocuments('collections', this.props.collections.map(({title, items}) => ({title, items})))
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
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={(_) =>
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
