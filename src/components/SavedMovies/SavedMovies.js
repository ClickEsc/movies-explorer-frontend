import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import movie1 from '../../images/movie-card__image_1.jpg';
import movie2 from '../../images/movie-card__image_2.jpg';
import movie3 from '../../images/movie-card__image_3.jpg';

import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <section className="saved-movies">
      { props.isLoading ?
        <Preloader />
        :
          <>
            <div className="saved-movies__container">
              <MoviesCard src={movie1} name="33 слова о дизайне" />
              <MoviesCard readyForDelete={true} src={movie2} name="Киноальманах «100 лет дизайна»" />
              <MoviesCard src={movie3} name="В погоне за Бенкси" />
            </div>
          </>
      }
    </section>
  )
};

export default SavedMovies;