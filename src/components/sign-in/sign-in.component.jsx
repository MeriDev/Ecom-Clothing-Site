import './sign-in.styles.scss';

import CustomBtn from '../custom-button/custom-button-component';

import FormInput from '../form-input/form-input.component';

import { connect } from 'react-redux';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../Redux/users/user.actions';
import { useState } from 'react';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    emailSignInStart(email, password);
  };

  // handleChange = e => {
  //   const { value, name } = e.target;
  //   this.setState({ [name]: value });
  // };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={e => setEmail(e.target.value)}
          label="Email"
          required
        />

        <FormInput
          type="password"
          name="password"
          autoComplete="off"
          handleChange={e => setPassword(e.target.value)}
          value={password}
          label="password"
          required
        />

        <div className="buttons">
          <CustomBtn type="submit">Sign In</CustomBtn>
          <CustomBtn type="button" onClick={googleSignInStart} isGoogleSignIn>
            Sign In With Google
          </CustomBtn>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapStateToProps)(SignIn);
