import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm(props) {

  const location = useLocation();
  const path = location.pathname;

  const [movieName, setMovieName] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);

  function handleMovieNameChange(e) {
    setMovieName(e.target.value)
  };

  function resetForm() {
    setMovieName('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch(movieName);
  }

  function toggleCheckBox() {
    setIsChecked(!isChecked);
  }

  function handleDurationFilter() {
    props.onDurationFilter(isChecked);
    toggleCheckBox();
  }

  React.useEffect(() => {
    props.onDurationFilter(isChecked);
  }, [isChecked]);

  React.useEffect(() => {
    if (path === "/movies") {
      const moviesQuery = JSON.parse(localStorage.getItem('moviesQuery'));
      if (moviesQuery) {
        setMovieName(moviesQuery);
      }
    } else {
      const savedMoviesQuery = JSON.parse(localStorage.getItem('savedMoviesQuery'));
      if (savedMoviesQuery) {
        setMovieName(savedMoviesQuery);
      }
    }
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} className="search-form" name="search-form">
      <div className="search-form__wrap search-form__wrap_film-name">
        <input value={movieName} onChange={handleMovieNameChange} className="search-form__input search-form__input_film-name" type="text" placeholder="Фильм"></input>
        <button className="search-form__search-button" type="submit"></button>
      </div>
      <div className="search-form__wrap search-form__wrap_film-duration">
        <div className="search-form__switch">
          <input disabled={!props.isCheckBoxActive} checked={isChecked} onChange={handleDurationFilter} className="search-form__input search-form__input_film-duration" id="filmDurationInput" type="checkbox"></input>
        </div>
        <label className="search-form__label">Короткометражки</label>
      </div>
    </form>
  )
};

export default SearchForm;