import MoviesCard from '../MoviesCard/MoviesCard';
import { pathname } from '../../utils/constants';

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

import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <ul className="movies-cards">
      {(pathname === "/movies") &&
        <>
          <li className="movies-cards__card">
            <MoviesCard
              isSaved={props.isSuperMobile && true}
              showButton={!props.isSuperMobile && true}
              src={movie1}
              name="33 слова о дизайне"
            />
          </li>
          <li className="movies-cards__card">
            <MoviesCard
              isSaved={!props.isSuperMobile && true}
              showButton={props.isSuperMobile && true}
              src={movie2}
              name="Киноальманах «100 лет дизайна»"
            />
          </li>
          <li className="movies-cards__card">
            <MoviesCard
              showButton={props.isSuperMobile && true}
              src={movie3}
              name="В погоне за Бенкси"
            />
          </li>
          <li className="movies-cards__card">
            <MoviesCard
              isSaved={(props.isSuperMobile || props.isMobile) && true}
              src={movie4}
              name="Баския: Взрыв реальности" 
            />
          </li>
          <li className="movies-cards__card">
            <MoviesCard
              showButton={props.isSuperMobile && true}
              src={movie5}
              name="Бег это свобода"
            />
          </li>
          {(!props.isSuperMobile) ?
            <>
              <li className="movies-cards__card">
                <MoviesCard
                  isSaved={!props.isMobile && true}
                  src={movie6}
                  name="Книготорговцы"
                />
              </li>
              <li className="movies-cards__card">
                <MoviesCard
                  src={movie7}
                  name="Когда я думаю о Германии ночью"
                />
              </li>
              <li className="movies-cards__card">
                <MoviesCard
                  src={movie8}
                  name="Gimme Danger: История Игги и The Stooges"
                />
              </li>
            </>
          : '' }
          {(!props.isMobile) ?
            <>
              <li className="movies-cards__card">
                <MoviesCard
                  src={movie9}
                  name="Дженис: Маленькая девочка грустит"
                />
              </li>
              <li className="movies-cards__card">
                <MoviesCard
                  src={movie10}
                  name="Соберись перед прыжком"
                />
              </li>
              <li className="movies-cards__card">
                <MoviesCard
                  src={movie11}
                  name="Пи Джей Харви: A dog called money"
                />
              </li>
              <li className="movies-cards__card">
                <MoviesCard
                  src={movie12}
                  name="По волнам: Искусство звука в кино"
                />
              </li>
            </>  
          : '' }
        </>
      }
      {(pathname === "/saved-movies") &&
        <>
          <li className="movies-cards__card">
            <MoviesCard
              readyForDelete={props.isMobile && true} src={movie1}
              name="33 слова о дизайне"
            />
          </li>
          <li className="movies-cards__card">
            <MoviesCard
              readyForDelete={(props.isSuperMobile || !props.isMobile) && true}
              src={movie2}
              name="Киноальманах «100 лет дизайна»"
            />
          </li>
          {(!props.isSuperMobile) ?
            <>
              <li className="movies-cards__card">
                <MoviesCard
                src={movie3}
                name="В погоне за Бенкси"
              />
            </li>
            </>  
          : '' }
        </>
      }
    </ul>
  )
};

export default MoviesCardList;