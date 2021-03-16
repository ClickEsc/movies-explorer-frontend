import logo from "../../images/navigation__logo.svg";
import './Navigation.css';

function Navigation() {
  return (
    <section className="navigation">
      <img className="navigation__logo" src={logo} alt="Стилизованный логотип сервиса обзора фильмов 'Movies Explorer'"/>
      <div className="navigation__container">
        <button className="navigation__button navigation__button_signup">Регистрация</button>
        <button className="navigation__button navigation__button_signin">Войти</button>
      </div>
    </section>
  );
}

export default Navigation;