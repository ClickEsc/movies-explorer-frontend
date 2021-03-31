import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthForm.css';

function AuthForm(props) {

  const location = useLocation();
  const path = location.pathname;

  function setFormStyle() {
    if (path === "/signin" && props.isMobile) {
      return {height: "300px"}
    } else if (path === "/signup" && props.isSuperMobile) {
      return {height: "84vh"}
    } else if (path === "/signin" && props.isSuperMobile) {
      return {height: "85vh"}
    }
  }

  return (
    <div className="auth">
      <form
        noValidate
        onSubmit={props.onSubmit}
        className={`auth__form auth__form_${props.name}`} name={`${props.name}-form`}
        style={setFormStyle()}>
        <div className="auth__wrap">
          <h2 className="auth__title">{`${props.title}`}</h2>
          { props.name === "signup" ? 
            <div className="auth__container auth__container_name">
              <label className="auth__label auth__label_name" for="authNameInput">Имя</label>
              <input
                required
                value={props.userName}
                name="name"
                minLength="2"
                maxLength="30"
                onChange={props.onChange}
                className="auth__input auth__input_name"
                id="authNameInput"
                type="text">
              </input>
              {props.inputErrors.name
                && <span id="nameInputError" className="auth__error-text auth__error-text_name">{props.inputErrors.name}</span>}
            </div>
          : "" }
          <div className="auth__container auth__container_email">
            <label className="auth__label auth__label_email" for="authEmailInput">E-mail</label>
            <input
              required
              value={props.userEmail}
              name="email"
              onChange={props.onChange}
              className="auth__input auth__input_email"
              id="authEmailInput"
              type="email">
            </input>
            {props.inputErrors.email
              && <span id="emailInputError" className="auth__error-text auth__error-text_email">{props.inputErrors.email}</span>}
          </div>
          <div className="auth__container auth__container_password">
            <label className="auth__label auth__label_password" for="authPasswordInput">Пароль</label>
            <input
              required
              value={props.userPassword}
              name="password"
              minLength="6"
              onChange={props.onChange}
              className="auth__input auth__input_password"
              id="authPasswordInput"
              type="password">
            </input>
            {props.inputErrors.password 
              && <span id="passwordInputError" className="auth__error-text auth__error-text_password">{props.inputErrors.password}</span>}
          </div>
        </div> 
        <div className="auth__wrap">
          {props.isError && <p className="auth__error">{props.error}</p>}
          <button
            disabled={!props.isValid}
            className={`auth__save ${!props.isValid && "auth__save_disabled"}`}
            type="submit"
            aria-label="Сохранить изменения">
              {`${props.buttonTitle}`}
          </button>
          {props.children}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;