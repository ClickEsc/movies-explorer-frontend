import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import { useFormValidation } from '../../utils/validation';
import './Login.css';

function Login(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onLogin(values.email, values.password);
    }
    resetForm();
  }

  return (
    <AuthForm
      userEmail={values.email || ''}
      userPassword={values.password || ''}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isValid={isValid}
      inputErrors={errors}
      isError={props.isError}
      error={props.error}
      isSuperMobile={props.isSuperMobile}
      name="signin"
      title="Рады видеть!"
      buttonTitle="Войти"
      children={
        <>
          <p className="login__hint">Ещё не зарегистрированы?<Link to="/signup" className="login__link">Регистрация</Link></p>
        </>
      }
    />
  );
}
  
export default Login;