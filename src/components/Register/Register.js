import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import { useFormValidation } from '../../utils/validation';
import './Register.css';

function Register(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      props.onRegister(values.name, values.email, values.password);
    }
    resetForm();
  }

  return (
    <AuthForm
      userName={values.name || ''}
      userEmail={values.email || ''}
      userPassword={values.password || ''}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isValid={isValid}
      inputErrors={errors}
      isSuperMobile={props.isSuperMobile}
      name="signup"
      title="Добро пожаловать!"
      buttonTitle="Зарегистрироваться"
      children={
        <>
          <p className="register__hint">Уже зарегистрированы?<Link to="/signin" className="register__link">Войти</Link></p>
        </>
      }
    />
  );
}
  
export default Register;