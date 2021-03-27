import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies(props) {
  return (
    <section className="movies">
      {props.isLoading
        ? <Preloader />
        : <MoviesCardList movies={props.movies} onSave={props.onSave} isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
    </section>
  )
};

export default Movies;