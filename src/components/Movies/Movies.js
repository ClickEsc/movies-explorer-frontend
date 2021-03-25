import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import './Movies.css';

function Movies(props) {
  return (
    <section className="movies">
      {props.isLoading
        ? <Preloader />
        : <MoviesCardList movies={props.movies} isMobile={props.isMobile} isSuperMobile={props.isSuperMobile} />
      }
      {props.isLoading
        ? "" 
        : <button className="movies__load-more" type="button">Ещё</button>
      }
    </section>
  )
};

export default Movies;