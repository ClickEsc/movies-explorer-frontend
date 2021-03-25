import React from 'react';
import { pathname } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard(props) {

  const [isShown, setIsShown] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  function getImageUrl() {
    if (props.movie.image !== null) {
      return 'https://api.nomoreparties.co' + props.movie.image.url
    } else {
      return 'https://www.webpsilon.com/wp-content/uploads/2018/02/Image_Not_Found_1x_qjofp8.png'
    }
  }

  // Перевод минут в часы и минуты
  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
	  const minutes = mins % 60;
	  return hours + 'ч ' + minutes + 'м';
  };

  function showButton() {
    setIsShown(true);
  }

  function hideButton() {
    setIsShown(false);
  }

  function saveMovie() {
    setIsSaved(true);
  }

  function deleteMovie() {
    setIsSaved(false);
  }

  return (
    <div className="movies-card" onMouseEnter={showButton} onMouseLeave={hideButton}>
      <a className="movies-card__link"
        href={props.movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        title="Ссылка на трейлер фильма на Youtube"
        >
          <img className="movies-card__image" src={getImageUrl()} alt={`Кадр из фильма ${props.movie.nameRU}`} />
      </a>
      {pathname === "/movies" && isShown && isSaved && (<button onClick={deleteMovie} className="movies-card__button movies-card__button_unfav" type="button"></button>)}
      {pathname === "/movies" && isShown && !isSaved && (<button onClick={saveMovie} className="movies-card__button movies-card__button_fav" type="button">Сохранить</button>)}
      {pathname === "/saved-movies" && isShown && isSaved && (<button onClick={deleteMovie} className="movies-card__button movies-card__button_delete" type="button"></button>)}
      <div className="movies-card__info">
        <h3 className="movies-card__title">{props.movie.nameRU}</h3>
        <p className="movies-card__duration">{getTimeFromMins(props.movie.duration)}</p>
      </div>
    </div>
  )
};

export default MoviesCard;