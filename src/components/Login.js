import React, { useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import * as auth from '../utils/auth'
import { AppContext } from "../contexts/CurrentUserContext"
import SignForm from './SignForm';

const Login = ({ handleLoginSubmit }) => {
  // static contextType = AppContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(email, password);
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputValues(() => ({ [name]: value }))
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = inputValues;
  //   handleLoginSubmit(password, email)
  // }


  // handleSubmit(e) {
  //   const context = this.context;
  //   e.preventDefault();
  //   if (!this.state.email || !this.state.password) {
  //     return;
  //   };
  //   auth.authorize(this.state.email, this.state.password)
  //     .then((data) => {
  //       if (!data) {
  //         return this.setState({
  //           message: 'Something went wrong!'
  //         });
  //       };
  //       if (data.jwt) {
  //         this.setState({ email: '', password: '' }, () => {
  //           context.handleLogin(); //update our code
  //           this.props.history.push('/register');
  //           return;
  //         })
  //       };
  //     })
  //     .catch(err => console.log(err));
  // };


  return (
    <div className="auth-modal">
      <SignForm title="Log in" onSubmit={handleSubmit} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} authMode="Not a member yet? " authAction="Sign up here!" link={'/signup'} email={email} password={password}/>
    </div>
  )
};

export default withRouter(Login);
