import React, { Component } from 'react';

import './sign-in.styles.scss';

import CustomBtn from '../custom-button/custom-button-component';

import FormInput from '../form-input/form-input.component';

import { signUpWithGoogle } from '../../firebase/firebase.utils';
// import {auth, signInWithEmailAndPassword } from 'firebase/auth';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    // const { email, password } = this.state;

    // try {
    //   await signInWithEmailAndPassword(auth, email, password)
    //     .then
    //     // userCredential => {
    //     //   const user = userCredential.user;
    //     //   console.log(user);
    //     // }
    //     ();
    //   } catch (err) {
    //     console.log(err);
    //   }
    this.setState({ email: '', password: '' });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            autoComplete="off"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            required
          />

          <div className="buttons">
            <CustomBtn type="submit">Sign In</CustomBtn>
            <CustomBtn onClick={signUpWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomBtn>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
