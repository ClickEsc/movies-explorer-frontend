import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

  const location = useLocation();
  const path = location.pathname;

  return (
    <div className={`navigation ${path === "/" && 'navigation_landing'}`}>
      <Link
        to="/movies"
        className={`navigation__link ${path === "/movies" && 'navigation__link_active'}`}>
        Фильмы
      </Link>
      <Link
        to="/saved-movies"
        className={`navigation__link ${path === "/saved-movies" && 'navigation__link_active'}`}>
        Сохранённые фильмы
      </Link>
    </div>
  );
}

export default Navigation;