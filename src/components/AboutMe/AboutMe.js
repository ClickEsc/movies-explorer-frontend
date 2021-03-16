import { checkMyAge } from '../../utils/constants';
import photo from '../../images/about-me__photo.png';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Ирина</h3>
          <p className="about-me__description">Фронтенд-разработчик, {checkMyAge()}.</p>
          <p className="about-me__text">
            Я родилась и выросла в Москве, но недавно переехала жить в Казань.
            Образование&nbsp;языковое. Более 6 лет проработала в сфере международного 
            сотрудничества. Сейчас перешла в веб-разработку и активно изучаю
            новые технологии. Очень люблю английский язык и кодить, а ещё увлекаюсь хупингом.
          </p>
          <div className="about-me__links">
          <a href="https://facebook.com/" className="about-me__link">Facebook</a>
          <a href="https://github.com/ClickEsc" className="about-me__link">Github</a>
        </div>
        </div>
        <img className="about-me__photo" src={photo} alt="Фотография автора работы"/>
      </div>
    </section>
  );
}

export default AboutMe;