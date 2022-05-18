import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignForm from './SignForm'
import * as auth from '../utils/auth'

const Register = ({ handleRegisterSubmit}) => {

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
    handleRegisterSubmit(email, password);
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputValues(() => ({ [name]: value }))
  // };

  //  const handleSubmit = (e) => {
  //    e.preventDefault();
  //    const { email, password } = inputValues;
  //    handleRegisterSubmit(email, password)
  //  };


  return (
    <div>
      <SignForm title="Sign up" onSubmit={handleSubmit} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} authMode="Already a member? " authAction="Log in here !" link={'/signin'} email={email} password={password}/>
    </div>
  )
}

export default withRouter(Register);

