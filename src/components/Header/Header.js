import React from 'react';
import { Route, Link, useLocation } from 'react-router-dom';
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
  }, [location]);

  return (
    <header className="header" style={headerStyle}>
      <Link to="/" className="header__link header__link_landing" style={headerLinkStyle}>
          <img className="header__logo" src={logo} alt="Стилизованный логотип сервиса обзора фильмов 'Movies Explorer'" />
      </Link>
      <Route exact path="/">
        <div className="header__container">
          {props.isLoggedIn 
          ? <Navigation /> && (!props.isMobile ? <AccountLink /> : <img onClick={props.onMenuClick} className="header__menu-icon" src={menu} alt="Стилизованная иконка меню" />)
          : <>
              <Link to="/signup" className="header__link header__link_signup">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_signin">Войти</Link>
            </>
          }
        </div>
      </Route>
      <Route path="/movies">
        {!props.isMobile &&
          <Navigation />
        }
        { !props.isMobile
          ? <AccountLink />
          : <img onClick={props.onMenuClick} className="header__menu-icon" src={menu} alt="Стилизованная иконка меню" />}
      </Route>
      <Route path="/saved-movies">
        {!props.isMobile &&
          <Navigation />
        }
        { !props.isMobile
          ? <AccountLink />
          : <img onClick={props.onMenuClick} className="header__menu-icon" src={menu} alt="Стилизованная иконка меню" />}
      </Route>
      <Route path="/profile">
        {!props.isMobile &&
          <Navigation />
        }
        { !props.isMobile
          ? <AccountLink />
          : <img onClick={props.onMenuClick} className="header__menu-icon" src={menu} alt="Стилизованная иконка меню" />}
      </Route>
    </header>
  );
}

export default Header;