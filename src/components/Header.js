import React from 'react';
import logo from '../images/Logo.svg';

export default function Header () {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo"/>
    </header>
  );
}

