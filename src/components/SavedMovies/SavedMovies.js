import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      {props.isLoading
        ? <Preloader />
        : <MoviesCardList isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
    </section>
  )
};

export default SavedMovies;