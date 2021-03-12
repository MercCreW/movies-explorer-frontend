import React from 'react';
import { NavLink } from 'react-router-dom';
import headLogo from '../../images/Logo.svg';
import accountImage from '../../images/accountImage.svg';
import './Header.css';


function Header({loggedIn}) {

    // const { pathname } = useLocation();
    // const linkProfileText = `${pathname === '/signin' ? 'Войти' : 'Аккаунт'}`;
    // const linkPath = `${pathname === '/signin' ? '/signup' : '/signin'}`;

    const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  
    function handleOpenMenu() {
      setMenuIsOpen(true);
    }
  
    function handleCloseMenu() {
      setMenuIsOpen(false);
    }
    return(
        <header className ={`header ${loggedIn && 'header_background-color_white'}`}>
            <NavLink to="/" className="header__logo"><img src={headLogo} alt="Логотип. Синее кольцо." /></NavLink>
            {loggedIn
            ?
            (<>
            <div className="header__container">
                <div className={`header__cover ${!menuIsOpen && 'header__cover_hidden'}`}>
                    <nav className="header__menu">
                        <div className="header__menu-main-movies">
                        <NavLink to="/" className={`header__menu-item ${!menuIsOpen && 'header__menu_hidden'}`} onClick={handleCloseMenu}>Главная</NavLink>
                        <NavLink to="/movies" className="header__menu-item" activeClassName="header__menu-item_active" onClick={handleCloseMenu}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" className="header__menu-item" activeClassName="header__menu-item_active" onClick={handleCloseMenu}>Сохранённые фильмы</NavLink>
                        </div>
                        <NavLink to="/profile" className="header__profile" onClick={handleCloseMenu}>
                            <p className="header__profile-text">Аккаунт</p>
                            <img src={accountImage} alt="Аккаунт" className="header__profile-img"/>
                        </NavLink>
                        <div className="header__close-menu" onClick={handleCloseMenu}>
                            <div className="header__cross"></div>
                        </div>
                    </nav>
                </div>
                <div className="header__open-menu" onClick={handleOpenMenu}>
                    <div className="header__line"></div>
                </div>
            </div>
            </>)       
                :(<nav className="header__auth ">
                    <NavLink to="/signup" className="header__signup">Регистрация</NavLink>
                    <NavLink to="/signin" className="header__signin">Войти</NavLink>
                </nav>)
            }
      </header>
    )
}

export default Header;