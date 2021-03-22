import { Link } from 'react-router-dom';
import AccountLink from '../AccountLink/AccountLink';
import { pathname } from '../../utils/constants';
import cross from '../../images/popup__close-icon.svg';
import './PopupMenu.css';

function PopupMenu(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <ul className="popup__list">
          <li className="popup__list-item">
            <Link
              to="/"
              className={`popup__link ${(pathname === "/") ? 'popup__link_active' : ''}`}>
                Главная
            </Link>
          </li>
          <li className="popup__list-item">
            <Link
              to="/movies"
              className={`popup__link ${(pathname === "/movies") ? 'popup__link_active' : ''}`}>
                Фильмы
            </Link>
          </li>
          <li className="popup__list-item">
            <Link
              to="/saved-movies"
              className={`popup__link ${(pathname === "/saved-movies") ? 'popup__link_active' : ''}`}>
                Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <AccountLink />
        <button className="popup__close-button" type="button">
          <img classname="popup__close-icon" src={cross} alt="Крестик" />
        </button>
      </div>
    </div>
  );
}

export default PopupMenu;