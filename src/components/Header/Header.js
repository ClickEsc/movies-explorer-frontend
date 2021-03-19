import { Route, Link } from 'react-router-dom';
import logo from "../../images/navigation__logo.svg";
import icon from "../../images/header__profile-icon.svg";
import { pathname } from '../../utils/constants';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {

    function setHeaderStyle() {
      if (pathname === "/") {
        return {paddingBottom: "25px", backgroundColor: "#f3c1f8"}
      } else if (pathname === "/signin" || pathname === "/signup" ) {
        return {padding: "70px 0 6px", backgroundColor: "#fff", justifyContent: "center"}
      } else {
        return {paddingBottom: "18px", backgroundColor: "#fff"}
      }
    }

    function setHeaderLinkStyle() {
      if (pathname === "/signin" || pathname === "/signup" ) {
        return {width: "396px"}
      } else {
        return {width: "max-content"}
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
          <Navigation />
          <Link to="/profile" className="header__link header__link_profile">
            Аккаунт
            <div className="header__wrap header__wrap_movies">
              <img className="header__profile-icon" src={icon} alt="Стилизованная иконка профиля" />
            </div>
          </Link>
        </Route>
        <Route path="/saved-movies">
          <Navigation />
          <Link to="/profile" className="header__link header__link_profile">
            Аккаунт
            <div className="header__wrap header__wrap_saved-movies">
              <img className="header__profile-icon" src={icon} alt="Стилизованная иконка профиля" />
            </div>
          </Link>
        </Route>
        <Route path="/profile">
          <Navigation />
          <Link to="/profile" className="header__link header__link_profile">
            Аккаунт
            <div className="header__wrap header__wrap_saved-movies">
              <img className="header__profile-icon" src={icon} alt="Стилизованная иконка профиля" />
            </div>
          </Link>
        </Route>
      </header>
    );
  }
  
  export default Header;