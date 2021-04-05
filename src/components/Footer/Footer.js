import { useLocation } from 'react-router-dom';
import { thisYear } from '../../utils/constants';
import './Footer.css';

function Footer() {

  const location = useLocation();
  const path = location.pathname;

  return (
    <footer className={`footer ${(path === "/" || path === "/saved-movies" || path === "/movies") ? "footer_visible" : ''}`}>
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&copy; {thisYear}</p>
        <ul className="footer__list">
          <li className="footer__list-item"><a href="https://praktikum.yandex.ru/web" className="footer__link">Яндекс.Практикум</a></li>
          <li className="footer__list-item"><a href="https://github.com/ClickEsc" className="footer__link">Github</a></li>
          <li className="footer__list-item"><a href="https://facebook.com" className="footer__link">Facebook</a></li>
        </ul>
      </div>
    </footer>
    );
  }
  
export default Footer;