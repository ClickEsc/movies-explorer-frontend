import { Link } from 'react-router-dom';
import { pathname } from '../../utils/constants';
import './Navigation.css';

function Navigation() {
  return (
    <section className="navigation">
        <div className="navigation__container">
          <Link
            to="/movies"
            className={`navigation__link ${(pathname === "/movies") && 'navigation__link_active'}`}>
            Фильмы
          </Link>
          <Link
            to="/saved-movies"
            className={`navigation__link ${(pathname === "/saved-movies") && 'navigation__link_active'}`}>
            Сохранённые фильмы
          </Link>
        </div>
    </section>
  );
}

export default Navigation;