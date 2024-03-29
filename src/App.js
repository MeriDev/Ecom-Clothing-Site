import './App.css';
import { useEffect, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Checkout from './pages/checkout/checkout.component';
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { selectCurrentUser } from './Redux/users/user.selector';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './Redux/users/user.actions';

import Spinner from './components/with-spinner/spinner.component';

// App component
const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="shop/*" element={<ShopPage />} />
            <Route path="checkout" element={<Checkout />} />

            <Route
              path="/signin"
              element={currentUser ? <Navigate to={'/'} /> : <SignInSignUp />}
            />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
