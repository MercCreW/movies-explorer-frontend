import React from 'react';
import './FilterButton.css';

function FilterButton({onFilter}) {

  function handleOnChange(evt) {
    onFilter(evt.target.checked);
    console.log(evt.target.checked);
  }

  return (
    <div className="checkbox" >
      <input type="checkbox" value="None" id="filter" name="check" className="checkbox__input"  onChange={handleOnChange}/>
      <label htmlFor="filter" className="checkbox__label"></label>
    </div>
    
  );
}

export default FilterButton;