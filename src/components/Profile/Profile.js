import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <p className="profile__greeting">Привет, Виталий!</p>
      <form noValidate className="profile__form" name="profile-update-form">
        <div className="profile__container profile__container_name">
          <label className="profile__label profile__label_name" for="profileNameInput">Имя</label>
          <input className="profile__input profile__input_name" id="profileNameInput" value="Виталий" type="text" />
        </div>
        <div className="profile__container profile__container_email">
          <label className="profile__label profile__label_email" for="profileEmailInput">E-mail</label>
          <input className="profile__input profile__input_email" id="profileEmailInput" value="pochta@yandex.ru" type="email" />
        </div>
        <button className="profile__save" type="submit" aria-label="Сохранить изменения">Редактировать</button>
      </form>
      <Link to="/" className="profile__link">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;