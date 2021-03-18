import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

import movie1 from '../../images/movie-card__image_1.jpg';
import movie2 from '../../images/movie-card__image_2.jpg';
import movie3 from '../../images/movie-card__image_3.jpg';
import movie4 from '../../images/movie-card__image_4.jpg';
import movie5 from '../../images/movie-card__image_5.jpg';
import movie6 from '../../images/movie-card__image_6.jpg';
import movie7 from '../../images/movie-card__image_7.jpg';
import movie8 from '../../images/movie-card__image_8.jpg';
import movie9 from '../../images/movie-card__image_9.jpg';
import movie10 from '../../images/movie-card__image_10.jpg';
import movie11 from '../../images/movie-card__image_11.jpg';
import movie12 from '../../images/movie-card__image_12.jpg';

import './Movies.css'

function Movies(props) {
  return (
    <section className="movies">
      { props.isLoading ?
        <Preloader />
        :
          <>
            <div className="movies__container">
              <MoviesCard showButton={true} src={movie1} name="33 слова о дизайне" />
              <MoviesCard isSaved={true} src={movie2} name="Киноальманах «100 лет дизайна»" />
              <MoviesCard src={movie3} name="В погоне за Бенкси" />
              <MoviesCard src={movie4} name="Баския: Взрыв реальности" />
              <MoviesCard src={movie5} name="Бег это свобода" />
              <MoviesCard isSaved={true} src={movie6} name="Книготорговцы" />
              <MoviesCard src={movie7} name="Когда я думаю о Германии ночью" />
              <MoviesCard src={movie8} name="Gimme Danger: История Игги и The Stooges" />
              <MoviesCard src={movie9} name="Дженис: Маленькая девочка грустит" />
              <MoviesCard src={movie10} name="Соберись перед прыжком" />
              <MoviesCard src={movie11} name="Пи Джей Харви: A dog called money" />
              <MoviesCard src={movie12} name="По волнам: Искусство звука в кино" />
            </div>
            <button className="movies__load-more" type="submit">Ещё</button>
          </>
      }
    </section>
  )
};

export default Movies;