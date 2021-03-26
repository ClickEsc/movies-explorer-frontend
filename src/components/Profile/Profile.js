import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile(props) {

  const currentUserInfo = React.useContext(CurrentUserContext);

  const [userName, setUserName] = React.useState(currentUserInfo.name);
  const [userEmail, setUserEmail] = React.useState(currentUserInfo.email);

  function handleUserNameChange(e) {
    setUserName(e.target.value);
    toggleSaveButton();
  };

  function handleUserEmailChange(e) {
    setUserEmail(e.target.value);
    toggleSaveButton();
  };

  function toggleSaveButton() {
    if ((userName === currentUserInfo.name && userEmail === currentUserInfo.email) || userName === '' || userEmail === '') {
      return true
    } else {
      return false
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

  return (
    <section className="profile">
      <p className="profile__greeting">Привет, {currentUserInfo.name}!</p>
      <form noValidate onSubmit={handleSubmit} className="profile__form" name="profile-update-form">
        <div className="profile__container profile__container_name">
          <label className="profile__label profile__label_name" for="profileNameInput">Имя</label>
          <input onChange={handleUserNameChange} className="profile__input profile__input_name" id="profileNameInput" value={userName || ''} type="text" />
        </div>
        <div className="profile__container profile__container_email">
          <label className="profile__label profile__label_email" for="profileEmailInput">E-mail</label>
          <input onChange={handleUserEmailChange} className="profile__input profile__input_email" id="profileEmailInput" value={userEmail || ''} type="email" />
        </div>
        <button disabled={toggleSaveButton()} className={`profile__save ${toggleSaveButton() ? 'profile__save_blocked' : ''} `} type="submit" aria-label="Сохранить изменения">Редактировать</button>
      </form>
      <Link to="/" className="profile__link">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;