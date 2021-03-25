import MoviesCard from '../MoviesCard/MoviesCard';
import { pathname } from '../../utils/constants';

import './MoviesCardList.css';

function MoviesCardList(props) {

  const renderedMovies = props.movies.map((item) => (
    <li key={item.id} className="movies-cards__card">
      <MoviesCard movie={item} />
    </li>
  ));

  function showHint() {
    if (pathname === "/movies") {
      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    } else if (pathname === "/saved-movies") {
      return 'У Вас пока нет сохранённых фильмов'
    }
  }

  return (
    <ul className="movies-cards">
      {renderedMovies && renderedMovies}
      {!renderedMovies && <p className="movies-cards__hint">{showHint()}</p>}
    </ul>
  )
};

export default MoviesCardList;