import { onAuthStateChanged } from '@firebase/auth';
import { Unsubscribe } from '@firebase/util';
import { getDoc } from 'firebase/firestore';
import React, { ReactNode } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigninAndSignupPage from './pages/signin-and-signup/signin-and-signup.component';


interface AppProps {
}
interface AppState {
  currentUser: any
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = {currentUser: null}
  }

  unsubscribeFromAuth!: Unsubscribe;
  componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        const snapshot = await getDoc(userRef)
        this.setState({
          currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }
        }, () => console.log(this.state))
      } else {
        this.setState({currentUser: null})
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render(): ReactNode {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SigninAndSignupPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
