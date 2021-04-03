import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile(props) {

  const currentUserInfo = React.useContext(CurrentUserContext);

  const [userName, setUserName] = React.useState(currentUserInfo.name);
  const [userEmail, setUserEmail] = React.useState(currentUserInfo.email);

  const [isShownEditButton, setIsShownEditButton] = React.useState(true);
  const [isShownSignOutLink, setIsShownSignOutLink] = React.useState(true);
  const [isShownSaveButton, setIsShownSaveButton] = React.useState(false);

  const [isNameError, setIsNameError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleUserNameChange(e) {
    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setIsNameError(true);
      setNameError('Длина имени должна составлять от 2 до 30 символов');
    } else if (e.target.value === currentUserInfo.name) {
      setIsNameError(true);
      setNameError('Введенное имя совпадает с текущим именем');
    } else {
      setIsNameError(false);
      setNameError('');
    }
    setUserName(e.target.value);
  };

  function handleUserEmailChange(e) {
    const isEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e.target.value);
    if (!isEmail) {
      setIsEmailError(true);
      setEmailError('Введите email');
    } else if (e.target.value === currentUserInfo.email) {
      setIsEmailError(true);
      setEmailError('Введенный email совпадает с текущим email');
    } else {
      setIsEmailError(false);
      setEmailError('');
    }
    handleValid();
    setUserEmail(e.target.value);
  };

  function showSaveButton() {
    setIsShownEditButton(false);
    setIsShownSignOutLink(false);
    setIsShownSaveButton(true);
  }

  function handleValid() {
    if (isNameError || isEmailError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onProfileUpdate({ name: userName, email: userEmail});
  }

  React.useEffect(() => {
    if (currentUserInfo) {
      setUserName(currentUserInfo.name);
      setUserEmail(currentUserInfo.email);
    }
  }, [currentUserInfo]);

  React.useEffect(() => {
    handleValid();
  }, [isNameError, isEmailError, userName, userEmail]);

  React.useEffect(() => {
    setIsFormValid(false);
    setIsNameError(false);
    setIsEmailError(false);
  }, []);

  return (
    <section className="profile">
      <p className="profile__greeting">Привет, {currentUserInfo.name}!</p>
      <form noValidate onSubmit={handleSubmit} className="profile__form" name="profile-update-form">
        <div className="profile__container profile__container_name">
          <label className="profile__label profile__label_name">Имя</label>
          <input
            disabled={isShownEditButton}
            value={userName || ''}
            onChange={handleUserNameChange}
            minLength="2"
            maxLength="30"
            className="profile__input profile__input_name"
            id="profileNameInput"
            type="text"
          />
          {isNameError && <span id="username-input-error" className="profile__input-error profile__input-error">{nameError}</span>}
        </div>
        <div className="profile__container profile__container_email">
          <label className="profile__label profile__label_email">E-mail</label>
          <input
          disabled={isShownEditButton}
          value={userEmail || ''}
          onChange={handleUserEmailChange}
          className="profile__input profile__input_email"
          id="profileEmailInput"
          type="email"
          />
          {isEmailError && <span id="email-input-error" className="profile__input-error profile__input-error_email">{emailError}</span>}
        </div>
        {props.isError && <p className="profile__error">{props.error}</p>}
        {isShownEditButton 
          && <button
          className="profile__button profile__button_edit"
          onClick={showSaveButton}
          type="button"
          aria-label="Редактировать профиль">
            Редактировать
          </button>
        }
        {isShownSaveButton
          && <button
            disabled={!isFormValid}
            className={`profile__button profile__button_save ${!isFormValid ? 'profile__button_disabled' : ''} `}
            type="submit"
            aria-label="Сохранить изменения">
              Сохранить
            </button>
        }
      </form>
      {isShownSignOutLink && <Link to="/" onClick={props.onSignOut} className="profile__link">Выйти из аккаунта</Link>}
    </section>
  );
}

export default Profile;