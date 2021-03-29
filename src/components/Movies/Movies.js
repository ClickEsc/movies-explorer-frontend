import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import React from 'react';

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm onSearch={props.onSearch} />
      {props.isLoading && <Preloader />}
      {props.movies
        && <MoviesCardList movies={props.movies} onSave={props.onSave} onDelete={props.onDelete} isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
    </section>
  )
};

export default Movies;