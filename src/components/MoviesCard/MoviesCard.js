import './MoviesCard.css';

function MoviesCard(props) {
  return (
    <div className="movies-card">
      <img className="movies-card__image" src={props.src} alt={`Кадр из фильма ${props.name}`} />
      { props.isSaved && <button className="movies-card__button movies-card__button_unfav" type="button"></button> }
      { props.showButton ? <button className="movies-card__button movies-card__button_fav" type="button">Сохранить</button> : '' }
      { props.readyForDelete && <button className="movies-card__button movies-card__button_delete" type="button"></button> }
      <div className="movies-card__info">
        <h3 className="movies-card__title">{props.name}</h3>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
    </div>
  )
};

export default MoviesCard;