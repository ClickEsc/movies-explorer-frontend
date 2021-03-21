import { Link } from 'react-router-dom';
import icon from "../../images/header__profile-icon.svg";
import menu from "../../images/mobile-menu-icon.svg"
import { width } from '../../utils/constants';
import './Menu.css';

function Menu() {
  return (
    <>
      {(width > 850)
      ? <Link to="/profile" className="header__link header__link_profile">
          Аккаунт
            <div className="header__wrap header__wrap_movies">
              <img className="header__profile-icon" src={icon} alt="Стилизованная иконка профиля" />
            </div>
          </Link>
      : <img className="header__menu-icon" src={menu} alt="Стилизованная иконка меню" />}
    </>  
  );
}

export default Menu;