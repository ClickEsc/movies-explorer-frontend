import { Link } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import './Register.css';

function Register() {
  return (
    <AuthForm registerForm={true} name="signup" title="Добро пожаловать!" buttonTitle="Зарегистрироваться" children={
      <>
        <p className="register__hint">Уже зарегистрированы?<Link to="/signin" className="register__link">Войти</Link></p>
      </>
    }/>
  );
}
  
export default Register;