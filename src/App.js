import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './Redux/users/user.actions';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Checkout from './pages/checkout/checkout.component';
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { onSnapshot } from 'firebase/firestore';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { selectCurrentUser } from './Redux/users/user.selector';
import { createStructuredSelector } from 'reselect';

// App component
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    // MOUNTING
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);
        console.log(userAuth);

        onSnapshot(userRef, snapshot => {
          setCurrentUser({
            currentUser: { id: snapshot.id, ...snapshot.data() },
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  // UNMOUNT
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="shop/*" element={<ShopPage />} />
            <Route path="checkout" element={<Checkout />} />

            <Route
              path="/signin"
              element={
                this.props.currentUser ? (
                  <Navigate to={'/'} />
                ) : (
                  <SignInSignUp />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
