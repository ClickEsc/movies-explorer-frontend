import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { pathname } from '../../utils/constants';

import './MoviesCardList.css';

function MoviesCardList(props) {

  const [moviesCount, setMoviesCount] = React.useState(0);

  const renderedMovies = props.movies.slice(0, moviesCount).map((item) => (
    <li key={item.id} className="movies-cards__card">
      <MoviesCard movie={item} />
    </li>
  ));

  function handleMoviesCount() {
    if (!props.isMobile) {
      setMoviesCount(12);
    } else if (props.isSuperMobile) {
      setMoviesCount(5);
    } else if (props.isMobile && !props.isSuperMobile) {
      setMoviesCount(8);
    } 
  }

  function loadMore() {
    if (!props.isMobile) {
      setMoviesCount(moviesCount + 3);
    } else if (props.isSuperMobile) {
      setMoviesCount(moviesCount + 2);
    } else if (props.isMobile && !props.isSuperMobile) {
      setMoviesCount(moviesCount + 2);
    } 
  }

  function showHint() {
    if (pathname === "/movies") {
      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    } else if (pathname === "/saved-movies") {
      return 'У Вас пока нет сохранённых фильмов'
    }
  }

  React.useEffect(() => {
    handleMoviesCount();
  }, []);

  return (
    <>
      <ul className="movies-cards">
        {renderedMovies && renderedMovies}
        {!renderedMovies && <p className="movies-cards__hint">{showHint()}</p>}
      </ul>
      {pathname === "/movies" && renderedMovies && <button onClick={loadMore} className="movies-cards__load-more" type="button">Ещё</button>}
    </>
  )
};

export default MoviesCardList;