import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      <SearchForm onSearch={props.onSearch} />
      {props.isLoading
        ? <Preloader />
        : <MoviesCardList movies={props.movies} onDelete={props.onDelete} isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
      {props.movies.length === 0 && <p className="saved-movies__hint">У Вас пока нет сохранённых фильмов</p>}
    </section>
  )
};

export default SavedMovies;