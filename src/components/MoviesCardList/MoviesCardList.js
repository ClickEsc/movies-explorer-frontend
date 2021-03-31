import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
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
    if (path === "/movies") {
      return 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    }
  }

  React.useEffect(() => {
    handleMoviesCount();
    console.log(props.movies.length);
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