import './SearchForm.css';
import search from '../../images/searchButton.svg';

function SearchForm() {
    return(
        <section className="search">
            <form name="search" className="search__form">
                <input className="search__input" placeholder="Фильм"/>
                <button className="search__button">
                    <img className="search__img" src={search} alt="Искать"/>
                </button>
            </form>
                <div className="search__short">
                    <div className="checkbox">
                        <input type="checkbox" value="None" id="filter" name="check" className="checkbox__input" />
                        <label for="filter" className="checkbox__label"></label>
                    </div>
                    <p className="search__filter-text">Короткометражки</p>
                    </div>
        </section>
    )
}

export default SearchForm;
