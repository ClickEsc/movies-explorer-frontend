import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../images/header__logo.svg";
import menu from "../../images/mobile-menu-icon.svg"
import Navigation from '../Navigation/Navigation';
import AccountLink from '../AccountLink/AccountLink';
import './Header.css';

function Header(props) {

  const location = useLocation();
  const path = location.pathname;

  const [headerStyle, setHeaderStyle] = React.useState();
  const [headerLinkStyle, setHeaderLinkStyle] = React.useState();
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function toggleHeaderStyle() {
    if (path === "/") {
      setHeaderStyle({paddingBottom: "25px", backgroundColor: "#f3c1f8"})
    } else if (path === "/signin" || path === "/signup") {
      if (props.isSuperMobile) {
        setHeaderStyle({padding: "56px 0 6px", backgroundColor: "#fff", textAlign: "center"})
      } else {
        setHeaderStyle({padding: "56px 0 6px", backgroundColor: "#fff", justifyContent: "flex-start"})
      }
    } else {
      setHeaderStyle({paddingBottom: "18px", backgroundColor: "#fff"})
    }
  }

  function toggleHeaderLinkStyle() {
    if ((path === "/signin" || path === "/signup")) {
      setHeaderLinkStyle({width: "396px", margin: "0 auto"})
    } else if ((path === "/signin" || path === "/signup") && (props.isSuperMobile)) {
      setHeaderLinkStyle({width: "300px", margin: "0 auto", textAlign: "center"})
    } else {
      if (path !== "/") {
        setHeaderLinkStyle({width: "max-content"})
      }
    }
  }

  React.useEffect(() => {
    toggleHeaderStyle();
    toggleHeaderLinkStyle();
  }, [location, size]);

  return (
    <header className="header" style={headerStyle}>
      <Link to="/" className="header__link header__link_landing" style={headerLinkStyle}>
        <img className="header__logo" src={logo} alt="Стилизованный логотип сервиса обзора фильмов 'Movies Explorer'" />
      </Link>
      {props.loggedIn && !props.isSuperMobile && <Navigation />}
      <div className="header__container">
        {props.loggedIn
          && (!props.isMobile 
            ? <AccountLink /> : <img onClick={props.onMenuClick} className="header__menu-icon" src={menu} alt="Стилизованная иконка меню" />)}
        {path === "/" && !props.loggedIn &&
          <>
            <Link to="/signup" className="header__link header__link_signup">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_signin">Войти</Link>
          </>
        }
      </div>
    </header>
  );
}

export default Header;