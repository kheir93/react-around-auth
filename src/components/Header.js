import React from 'react';
import logo from '../images/Logo.svg';

export default function Header({ logout }) {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo"/>
      <button className="header__logout-button" onClick={logout}>Logout</button>
    </header>
  );
}

