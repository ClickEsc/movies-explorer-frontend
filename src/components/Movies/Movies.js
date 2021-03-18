import Preloader from '../Preloader/Preloader';
import './Movies.css'

function Movies(props) {
  return (
    <section className="movies">
      { props.isLoading ?
        <Preloader />
        :
          <div className="movies__container">
        
          </div>
      }
    </section>
  )
};

export default Movies;