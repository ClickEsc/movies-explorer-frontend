import React from 'react';
import { useLocation } from 'react-router-dom';
import { baseUrlForImages, noImagePic } from '../../utils/constants';
import './MoviesCard.css';

function MoviesCard(props) {

  const location = useLocation();
  const path = location.pathname;

  const [isShown, setIsShown] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  function getImageUrl() {
    if (props.movie.image !== null || props.movie.image !== undefined) {
      if (path === '/movies') {
        return baseUrlForImages + props.movie.image.url
      } else return props.movie.image
    } else {
      return noImagePic
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
    props.onSave(props.movie);
    setIsSaved(true);
    props.movie.isSavedByUser = true;
  }

  function deleteMovie() {
    props.onDelete(props.movie);
    setIsSaved(false);
    props.movie.isSavedByUser = false;
  }

  return (
    <li className="movies-card" onMouseEnter={showButton} onMouseLeave={hideButton}>
      <a className="movies-card__link"
        href={props.movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        title="Ссылка на трейлер фильма на Youtube"
        >
          <img className="movies-card__image" src={getImageUrl()} alt={`Кадр из фильма ${props.movie.nameRU}`} />
      </a>
      {path === "/movies" && props.movie.isSavedByUser && (<button onClick={deleteMovie} className="movies-card__button movies-card__button_unfav" type="button"></button>)}
      {path === "/movies" && isShown && !props.movie.isSavedByUser && (<button onClick={saveMovie} className="movies-card__button movies-card__button_fav" type="button">Сохранить</button>)}
      {path === "/saved-movies" && isShown && (<button onClick={deleteMovie} className="movies-card__button movies-card__button_delete" type="button"></button>)}
      <div className="movies-card__info">
        <h3 className="movies-card__title">{props.movie.nameRU}</h3>
        <p className="movies-card__duration">{getTimeFromMins(props.movie.duration)}</p>
      </div>
    </li>
  )
};

export default MoviesCard;