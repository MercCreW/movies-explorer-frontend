import React from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ savedMovies, movies, onBookmarkClick, isSavedMovie }) {

  const [extraPortion, setExtraPortion] = React.useState(3);
  const [currentCount, setCurrenCount] = React.useState(0);
  const [renderMovies, setRenderMovies] = React.useState([]);

  function getCount(windowSize) {
    if (windowSize > 768 ) {
      return {first: 12, extra: 3}
    } else if (windowSize > 480 && windowSize <= 768) {
      return {first: 8, extra: 2}
    } else {
      return {first: 5, extra: 2}
    }
  }

  function renderExtraPortion() {
    const count = Math.min(movies.length,currentCount+extraPortion);
    const extraMovies = movies.slice(currentCount,count)
    setRenderMovies([...renderMovies, ...extraMovies]);
    setCurrenCount(count);
  }

  function handleResize() {
    const windowSize = window.innerWidth;
    const sizePortion = getCount(windowSize);
    setExtraPortion(sizePortion.extra);
  }

  React.useEffect(() => {

    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[]);
  
  React.useEffect(() => {
    const windowSize = window.innerWidth;
    const sizePortion = getCount(windowSize);
    setExtraPortion(sizePortion.extra);
    const count = Math.min(movies.length,sizePortion.first);
    setRenderMovies(movies.slice(0,count));
    setCurrenCount(count);
  }, [movies])

  function handleMoreCards() {
    renderExtraPortion();
  }


    return(
        <>
        <section className="cards">
      {
        renderMovies.map((movie) => (
          <MoviesCard 
            savedMovies={savedMovies}
            key={movie.id}
            movie={movie}
            onBookmarkClick={onBookmarkClick}
            isSavedMovie={isSavedMovie}
          />
        ))
      }
        </section>
        <section className="cards__more">
          { currentCount < movies.length && <button className="card__button-more" onClick={handleMoreCards}>Ещё</button> }
        </section>
      </>
    )
}

export default MoviesCardList;
