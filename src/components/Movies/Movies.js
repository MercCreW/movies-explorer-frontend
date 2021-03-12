import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({savedMovies}) {
  return(
    <section className="Movies">
      <SearchForm />
      <MoviesCardList savedMovies={savedMovies}/>
    </section>
  )
}
export default Movies;