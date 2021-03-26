import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountLink from '../AccountLink/AccountLink';
import cross from '../../images/popup__close-icon.svg';
import './PopupMenu.css';

function PopupMenu(props) {

  const location = useLocation();
  const path = location.pathname;

  const [activeLink, setActiveLink] = React.useState('');

  function toggleActiveLink() {
    setActiveLink('popup__link_active');
  }

  React.useEffect(() => {
    toggleActiveLink();
  }, [location]);

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <ul className="popup__list">
          <li className="popup__list-item">
            <Link
              to="/"
              className={`popup__link ${path === "/" ? activeLink : ''}`}>
                Главная
            </Link>
          </li>
          <li className="popup__list-item">
            <Link
              to="/movies"
              className={`popup__link ${path === "/movies" ? activeLink : ''}`}>
                Фильмы
            </Link>
          </li>
          <li className="popup__list-item">
            <Link
              to="/saved-movies"
              className={`popup__link ${path === "/saved-movies" ? activeLink : ''}`}>
                Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <AccountLink />
        <button className="popup__close-button" type="button">
          <img onClick={props.onClose} classname="popup__close-icon" src={cross} alt="Крестик" />
        </button>
      </div>
    </div>
  );
}

export default PopupMenu;