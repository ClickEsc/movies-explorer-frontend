import './SearchForm.css';

function SearchForm() {
  return (
    <form noValidate className="search-form" name="search-form">
      <div className="search-form__wrap search-form__wrap_film-name">
        <input className="search-form__input search-form__input_film-name" type="text" placeholder="Фильм"></input>
        <button className="search-form__search-button" type="submit"></button>
      </div>
      <div className="search-form__wrap search-form__wrap_film-duration">
        <div className="search-form__switch">
          <input checked className="search-form__input search-form__input_film-duration" id="filmDurationInput" type="checkbox"></input>
        </div>
        <label className="search-form__label" for="filmDurationInput">Короткометражки</label>
      </div>
    </form>
  )
};

export default SearchForm;