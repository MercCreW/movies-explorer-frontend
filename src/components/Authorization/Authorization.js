import './Authorization.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Authorization() {
  return (
    <nav className="header__auth ">
        <NavLink to="/signup" className="header__signup">Регистрация</NavLink>
        <NavLink to="/signin" className="header__signin">Войти</NavLink>
    </nav>
  );
}

export default Authorization;