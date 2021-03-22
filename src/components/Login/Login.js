import { Link } from 'react-router-dom';
import AuthForm from "../AuthForm/AuthForm";
import './Login.css';

function Login(props) {
  return (
    <AuthForm isSuperMobile={props.isSuperMobile} name="signin" title="Рады видеть!" buttonTitle="Войти" children={
      <>
        <p className="login__hint">Ещё не зарегистрированы?<Link to="/signin" className="login__link">Регистрация</Link></p>
      </>
    }/>
  );
}
  
export default Login;