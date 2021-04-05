import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_MOVIE_CAP_DURATION } from '../../utils/constants';

import './SavedMovies.css';

function SavedMovies(props) {

  const [moviesToShow, setMoviesToShow] = React.useState(props.movies);
  const movies = props.movies.filter((item) => item.duration <= SHORT_MOVIE_CAP_DURATION);

  function filterMoviesByDuration(isChecked) {
    if (isChecked) {
      setMoviesToShow(movies);
    } else {
      setMoviesToShow(props.movies);
    }
  }

  React.useEffect(() => {
    setMoviesToShow(props.movies);
  }, [props.movies]);

  return (
    <section className="saved-movies">
      <SearchForm isCheckBoxActive={moviesToShow.length === 0 || movies.length === 0 ? false : true} onSearch={props.onSearch} onDurationFilter={filterMoviesByDuration} />
      {props.isLoading
        ? <Preloader />
        : <MoviesCardList movies={moviesToShow} onDelete={props.onDelete} isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
      {props.movies.length === 0 && !props.isError && <p className="saved-movies__hint">У Вас пока нет сохранённых фильмов</p>}
      {props.isError && <p className="saved-movies__hint">По введённому ключевому слову сохранённых фильмов не найдено</p>}
    </section>
  )
};

export default SavedMovies;