import { thisYear } from '../../utils/constants';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
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