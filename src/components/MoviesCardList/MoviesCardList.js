import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  MOVIES_ERROR_MSG,
  MOVIES_COUNT_DESKTOP,
  MOVIES_COUNT_MOBILE,
  MOVIES_COUNT_SUPER_MOBILE,
  MOVIES_NUMBER_TO_ADD_DESKTOP,
  MOVIES_NUMBER_TO_ADD_MOBILE } from '../../utils/constants';
import './MoviesCardList.css';

function MoviesCardList(props) {

  const location = useLocation();
  const path = location.pathname;

  const [moviesCount, setMoviesCount] = React.useState(0);
  const [size, setSize] = React.useState([0, 0]);

  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  const renderedMovies = props.movies.slice(0, moviesCount).map((item) => (
    <MoviesCard key={item.id} movie={item} onSave={props.onSave} onDelete={props.onDelete}/>
  ));

  function handleMoviesCount() {
    if (path === "/movies") {
      if (!props.isMobile) {
        setMoviesCount(MOVIES_COUNT_DESKTOP);
      } else if (props.isSuperMobile) {
        setMoviesCount(MOVIES_COUNT_MOBILE);
      } else if (props.isMobile && !props.isSuperMobile) {
        setMoviesCount(MOVIES_COUNT_SUPER_MOBILE);
      }
    } else {
      setMoviesCount(props.movies.length);
    }
  }

  function loadMore() {
    if (!props.isMobile) {
      setMoviesCount(moviesCount + MOVIES_NUMBER_TO_ADD_DESKTOP);
    } else {
      setMoviesCount(moviesCount + MOVIES_NUMBER_TO_ADD_MOBILE);
    }
  }

  function showHint() {
    if (path === "/movies") {
      return MOVIES_ERROR_MSG
    }
  }

  React.useEffect(() => {
    handleMoviesCount();
  }, [size]);

  return (
    <>
      <ul className="movies-cards">
        {renderedMovies && renderedMovies}
        {!renderedMovies && <p className="movies-cards__hint">{showHint()}</p>}
      </ul>
      {path === "/movies" && renderedMovies.length !== 0 && (props.movies.length - moviesCount >= 2) && <button onClick={loadMore} className="movies-cards__load-more" type="button">Ещё</button>}
    </>
  )
};

export default MoviesCardList;