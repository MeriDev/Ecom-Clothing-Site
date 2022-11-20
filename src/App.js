import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './components/Redux/users/user.actions';

import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { onSnapshot } from 'firebase/firestore';
import { auth, createUserProfileDoc } from './firebase/firebase.utils';

class App extends React.Component {
  unsunscribeFromAuth = null;

  // MOUNTING
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsunscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
    this.unsunscribeFromAuth();
  }

  // RENDER
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signin" element={<SignInSignUp />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
