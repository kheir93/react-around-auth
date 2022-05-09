import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SignForm from './SignForm'
import * as auth from '../utils/auth'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = props.handleSubmit;
    this.state.email = props.email;
    this.state.password = props.password

  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   let { email, password } = this.state;
  //   this.handleRegisterSubmit(email, password)
  // };

  render() {
    return (
      <div>
        <SignForm title="Sign up" onSubmit={this.handleSubmit} handleChange={this.handleChange} authMode="Already a member?" authAction={"Log in here !"} link={'/signin'} email={this.state.email} password={this.state.password} />
      </div>
    )
  };
}

export default withRouter(Register);

