import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import './Login.css';

function Login(props) {

  const [userEmail, setUserEmail] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value)
  };

  function handleUserPasswordChange(e) {
    setUserPassword(e.target.value)
  };

  function resetForm() {
    setUserEmail('');
    setUserPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(userEmail, userPassword);
    resetForm();
  }

  return (
    <AuthForm
      userEmail={userEmail || ''}
      userPassword={userPassword || ''}
      handleUserEmailChange={handleUserEmailChange}
      handleUserPasswordChange={handleUserPasswordChange}
      onSubmit={handleSubmit}
      isSuperMobile={props.isSuperMobile}
      name="signin"
      title="Рады видеть!"
      buttonTitle="Войти"
      children={
        <>
          <p className="login__hint">Ещё не зарегистрированы?<Link to="/signin" className="login__link">Регистрация</Link></p>
        </>
      }
    />
  );
}
  
export default Login;