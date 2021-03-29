import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
   
  const [moviesToShow, setMoviesToShow] = React.useState(props.movies);

  function filterMoviesByDuration(isChecked) {
    if (isChecked) {
      const movies = props.movies.filter((item) => item.duration <= 40);
      setMoviesToShow(movies);
    } else {
      setMoviesToShow(props.movies);
    }
  }

  React.useEffect(() => {
    setMoviesToShow(props.movies);
  }, [props.movies]);

  return (
    <section className="movies">
      <SearchForm onSearch={props.onSearch} onDurationFilter={filterMoviesByDuration} />
      {props.isLoading && <Preloader />}
      {props.movies
        && <MoviesCardList movies={moviesToShow} onSave={props.onSave} onDelete={props.onDelete} isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
    </section>
  )
};

export default Movies;