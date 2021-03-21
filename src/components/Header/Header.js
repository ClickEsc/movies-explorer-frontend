import { Route, Link } from 'react-router-dom';
import logo from "../../images/header__logo.svg";
import menu from "../../images/mobile-menu-icon.svg"
import { pathname } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';
import AccountLink from '../AccountLink/AccountLink';
import './Header.css';

function Header(props) {

    function setHeaderStyle() {
      if (pathname === "/") {
        return {paddingBottom: "25px", backgroundColor: "#f3c1f8"}
      } else if ((pathname === "/signin" || pathname === "/signup")) {
        if (props.isSuperMobile) {
          return {padding: "56px 0 6px", backgroundColor: "#fff", textAlign: "center"}
        } else {
          return {padding: "56px 0 6px", backgroundColor: "#fff", justifyContent: "flex-start"}
        }
      } else {
        return {paddingBottom: "18px", backgroundColor: "#fff"}
      }
    }

    function setHeaderLinkStyle() {
      if ((pathname === "/signin" || pathname === "/signup")) {
        return {width: "396px", margin: "0 auto"}
      } else if ((pathname === "/signin" || pathname === "/signup") && (props.isSuperMobile)) {
        return {width: "300px", margin: "0 auto", textAlign: "center"}
      } else {
        if (pathname !== "/") {
          return {width: "max-content"}
        }
      }
    }

    return (
      <header className="header" style={setHeaderStyle()}>
        <Link to="/" className="header__link header__link_landing" style={setHeaderLinkStyle()}>
            <img className="header__logo" src={logo} alt="Стилизованный логотип сервиса обзора фильмов 'Movies Explorer'" />
        </Link>
        <Route exact path="/">
          <div className="header__container">
            <Link to="/signup" className="header__link header__link_signup">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_signin">Войти</Link>
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