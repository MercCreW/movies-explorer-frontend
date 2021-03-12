import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({savedMovies}) {
    return(
        <>
        <section className="cards">
          <MoviesCard  savedMovies={savedMovies}/>
          <MoviesCard  savedMovies={savedMovies}/>
          <MoviesCard  savedMovies={savedMovies}/>
          <MoviesCard  savedMovies={savedMovies}/>
          <MoviesCard  savedMovies={savedMovies}/>
        </section>
        <section className="cards__more">
        { savedMovies ? (
          <></>
          ) : (
          <button className="card__button-more">Ещё</button>
        )}     
          
        </section>
      </>
    )
}

export default MoviesCardList;
