import { Link } from 'react-router-dom';
import icon from "../../images/account-link__icon.svg";
import './AccountLink.css';

function AccountLink() {
  return (
    <Link to="/profile" className="account-link">
      Аккаунт
      <div className="account-link__container">
        <img className="account-link__icon" src={icon} alt="Стилизованная иконка профиля" />
      </div>
    </Link>
  );
}

export default AccountLink;