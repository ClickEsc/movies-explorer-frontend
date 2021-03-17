import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <section className="profile">
      <p className="profile__greeting">Привет, Виталий!</p>
      <form className="profile__form">
        <div className="profile__container profile__container_name">
          <label className="profile__label profile__label_name" for="profileName">Имя</label>
          <input className="profile__input profile__input_name" id="profileName" value="Виталий" placeholder="Имя" type="text" />
        </div>
        <div className="profile__container profile__container_email">
          <label className="profile__label profile__label_email" for="profileEmail">E-mail</label>
          <input className="profile__input profile__input_email" id="profileEmail" value="pochta@yandex.ru" placeholder="E-mail" type="email" />
        </div>
        <button className="profile__save" type="submit" aria-label="Сохранить изменения">Редактировать</button>
      </form>
      <Link to="/" className="profile__link">Выйти из аккаунта</Link>
    </section>
  );
}

export default Profile;