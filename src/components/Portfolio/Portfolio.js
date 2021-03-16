import linkIcon from '../../images/portfolio__link-icon.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          Статичный сайт
          <a href="https://clickesc.github.io/how-to-learn/index.html" className="portfolio__link">
            <img className="portfolio__link-icon" src={linkIcon} alt="Иконка стрелочки, направленной вверх по-диагонали"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          Адаптивный сайт
          <a href="https://clickesc.github.io/russian-travel/index.html" className="portfolio__link">
            <img className="portfolio__link-icon" src={linkIcon} alt="Иконка стрелочки, направленной вверх по-диагонали"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          Одностраничное приложение
          <a href="https://skubilina.students.nomoreparties.space" className="portfolio__link">
            <img className="portfolio__link-icon" src={linkIcon} alt="Иконка стрелочки, направленной вверх по-диагонали"/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;