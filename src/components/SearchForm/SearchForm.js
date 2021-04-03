import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm(props) {

  const location = useLocation();
  const path = location.pathname;

  const [movieName, setMovieName] = React.useState('');
  const [isChecked, setIsChecked] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [error, setError] = React.useState('');

  function handleMovieNameChange(e) {
    isInputValid(e);
    setMovieName(e.target.value)
  };

  function isInputValid(e) {
    if (e.target.value.length === 0) {
      setIsError(true);
      setError('Введите запрос');
      setIsValid(false);
    } else {
      setIsError(false);
      setError('');
      setIsValid(true);
    }
  }

  function handleSubmit(e) {
    if (isValid) {
      e.preventDefault();
      props.onSearch(movieName);
    }
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
    if (movieName.length > 0) {
      setIsValid(true);
    }
  }, []);

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
        setIsValid(true);
      }
    }
    setIsError(false);
    setError('');
  }, []);

  return (
    <form noValidate onSubmit={handleSubmit} className="search-form" name="search-form">
      <div className="search-form__wrap search-form__wrap_film-name">
        <input
          value={movieName}
          minLength="1"
          onChange={handleMovieNameChange}
          className="search-form__input search-form__input_film-name"
          type="text"
          placeholder="Фильм">
        </input>
        {isError && <span className="search-form__input-error">{error}</span>}
        <button
          disabled={!isValid}
          className={`search-form__search-button ${!isValid && "search-form__search-button_disabled"}`}
          type="submit">
        </button>
      </div>
      <div className="search-form__wrap search-form__wrap_film-duration">
        <div className="search-form__switch">
          <input
            disabled={!props.isCheckBoxActive}
            checked={isChecked}
            onChange={handleDurationFilter}
            className={`search-form__input
              search-form__input_film-duration
              ${!props.isCheckBoxActive && "search-form__input_film-duration_disabled"}`
            }
            id="filmDurationInput"
            type="checkbox">
          </input>
        </div>
        <label className="search-form__label">Короткометражки</label>
      </div>
    </form>
  )
};

export default SearchForm;