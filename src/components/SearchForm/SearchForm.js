import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

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
    resetForm();
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

  return (
    <form noValidate onSubmit={handleSubmit} className="search-form" name="search-form">
      <div className="search-form__wrap search-form__wrap_film-name">
        <input value={movieName} onChange={handleMovieNameChange} className="search-form__input search-form__input_film-name" type="text" placeholder="Фильм"></input>
        <button className="search-form__search-button" type="submit"></button>
      </div>
      <div className="search-form__wrap search-form__wrap_film-duration">
        <div className="search-form__switch">
          <input checked={isChecked} onChange={handleDurationFilter} className="search-form__input search-form__input_film-duration" id="filmDurationInput" type="checkbox"></input>
        </div>
        <label className="search-form__label" for="filmDurationInput">Короткометражки</label>
      </div>
    </form>
  )
};

export default SearchForm;