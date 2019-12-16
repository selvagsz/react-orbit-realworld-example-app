import React from 'react';
import { Link } from '@reach/router';
import Logo from '../ui/Logo'

function Header() {
  return (
    <header className="Header">
      <div className="Header__Brand">
        <Logo />
      </div>
      <nav className="Header__Nav">
        <Link to="/" className="Header__NavLink">Home</Link>
        <a href="#/" className="Header__NavLink">Sign in</a>
        <a href="#/" className="Header__NavLink">Sign up</a>
      </nav>
    </header>
  );
}

export default Header;
