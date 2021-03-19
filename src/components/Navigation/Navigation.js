import { Link } from 'react-router-dom';
import { pathname } from '../../utils/constants';

import './Navigation.css';

function Navigation() {
  return (
    <section className="navigation">
      { (pathname === "/movies") &&
        <div className="navigation__wrap">
          <Link to="/movies" className="navigation__link navigation__link_active navigation__link_movies">Фильмы</Link>
          <Link to="/saved-movies" className="navigation__link navigation__link_saved-movies">Сохранённые фильмы</Link>
        </div> 
      }
      { (pathname === "/saved-movies") &&
        <div className="navigation__wrap">
          <Link to="/movies" className="navigation__link navigation__link_movies">Фильмы</Link>
          <Link to="/saved-movies" className="navigation__link navigation__link_active navigation__link_saved-movies">Сохранённые фильмы</Link>
        </div> 
      }
    </section>
  );
}

export default Navigation;