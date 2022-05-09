import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import * as auth from '../utils/auth'
import { AppContext } from "../contexts/CurrentUserContext"
import SignForm from './SignForm';

class Login extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = props.handleSubmit;
    this.state.email = props.email;
    this.state.password = props.password
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

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

  render() {
    return (
      <div className="form">
        <SignForm title="Log in" handleSubmit={this.handleSubmit} handleChange={this.handleChange} authMode="Not a member yet?" authAction="Sign up here!" link={'/signup'} email={this.state.email} password={this.state.password} />
      </div>
    )
  }
};

export default withRouter(Login);
