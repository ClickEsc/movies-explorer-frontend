import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import './Register.css';

function Register(props) {

  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  function handleUserNameChange(e) {
    setUserName(e.target.value)
  };

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value)
  };

  function handleUserPasswordChange(e) {
    setUserPassword(e.target.value)
  };

  function resetForm() {
    setUserName('');
    setUserEmail('');
    setUserPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(userName, userEmail, userPassword);
    resetForm();
  }

  return (
    <AuthForm
      userName={userName || ''}
      userEmail={userEmail || ''}
      userPassword={userPassword || ''}
      handleUserNameChange={handleUserNameChange}
      handleUserEmailChange={handleUserEmailChange}
      handleUserPasswordChange={handleUserPasswordChange}
      onSubmit={handleSubmit}
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