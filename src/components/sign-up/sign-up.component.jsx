import React from 'react';
import FormInput from '../form-input/form-input.component';

import CustomBtn from '../custom-button/custom-button-component';

import { auth, createUserProfileDoc } from '../../firebase/firebase.utils';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        userCredential => {
          const user = userCredential.user;

          createUserProfileDoc(user, { displayName });

          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            autoComplete="off"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            autoComplete="off"
            required
          />

          <CustomBtn type="submit">SIGN UP</CustomBtn>
        </form>
      </div>
    );
  }
}

export default SignUp;
