import React from 'react';
import logo from '../images/Logo.svg';
import { Route } from 'react-router-dom';

export default function Header({ logout }) {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo"/>
      <Route exact path="/">
      <button className="header__logout-button" onClick={logout}>Logout</button>
      </Route>
    </header>
  );
}

