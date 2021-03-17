import { Link } from 'react-router-dom';
import logo from "../../images/navigation__logo.svg";
import './AuthForm.css';

function AuthForm(props) {
  return (
    <div className="auth">
      <form noValidate className={`auth__form auth__form_${props.name}`} name={`${props.name}-form`}>
        <div className="auth__wrap">
          <Link to="/" className="auth__link"><img className="auth__logo" src={logo} alt="Стилизованный логотип сервиса обзора фильмов 'Movies Explorer'"/></Link>
          <h2 className="auth__title">{`${props.title}`}</h2>
          { props.registerForm ? 
            <div className="auth__container auth__container_name">
              <label className="auth__label auth__label_name" for="authNameInput">Имя</label>
              <input required value="Виталий" className="auth__input auth__input_name" id="authNameInput" type="email"></input>
              <span id="nameInputError" className="auth__error-text auth__error-text_visible auth__error-text_name"></span>
            </div>
          : "" }
          <div className="auth__container auth__container_email">
            <label className="auth__label auth__label_email" for="authEmailInput">E-mail</label>
            <input required value="pochta@yandex.ru|" id="authEmailInput" type="email" className="auth__input auth__input_email"></input>
            <span id="emailInputError" className="auth__error-text auth__error-text_visible auth__error-text_email"></span>
          </div>
          <div className="auth__container auth__container_password">
            <label className="auth__label auth__label_password" for="authPasswordInput">Пароль</label>
            <input required value={ props.registerForm ? "••••••••••••••" : '' } id="authPasswordInput" type="password" className="auth__input auth__input_password"></input>
            <span id="passwordInputError" className={ props.registerForm ? "auth__error-text auth__error-text_visible auth__error-text_password" : "auth__error-text auth__error-text_password" }>Что-то пошло не так...</span>
          </div>
        </div> 
        <div className="auth__wrap">
          <button className="auth__save" style={ props.registerForm ? ({ marginTop: '69px' }) : ({ marginTop: '179px' }) } type="submit" aria-label="Сохранить изменения">{`${props.buttonTitle}`}</button>
          {props.children}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;