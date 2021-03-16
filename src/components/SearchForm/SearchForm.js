import React from 'react';
import './SearchForm.css';
import search from '../../images/searchButton.svg';
import FilterButton from '../FilterButton/FilterButton';


function SearchForm({onSubmitSearch, onFilterShort, isLoading}) {

  const [query, setQuery] = React.useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);
  
  function handleOnChange(evt) {
    setQuery(evt.target.value);
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitSearch(query);
  }

  React.useEffect(() => {
    setIsSubmitDisabled(query === '');
  }, [query])

    return(
        <section className="search">
            <form name="search" className="search__form" onSubmit={handleOnSubmit}>
                <input className="search__input" placeholder="Фильм" onChange={handleOnChange} disabled={isLoading}/>
                <button className={`search__button ${isSubmitDisabled && 'search__button_disabled'}`} disabled={isSubmitDisabled || isLoading}>
                    <img className="search__img" src={search} alt="Искать"/>
                </button>
            </form>
                <div className="search__short">
                    <FilterButton onFilter={onFilterShort}/>
                    <p className="search__filter-text">Короткометражки</p>
                </div>
        </section>
    )
}

export default SearchForm;
