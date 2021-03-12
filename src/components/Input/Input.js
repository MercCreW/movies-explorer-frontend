import './Input.css';

function Input({id, name, type = "text", placeholder, errorText, minLength, maxLength}) {
  return (
    <article className="input">
      <label className="input__label" for={id}>{placeholder}</label>
      <input className={`input__field ${errorText && 'input__field_error'}`} id={id} type={type} name={name} 
        placeholder={placeholder} required minLength={minLength} maxLength={maxLength}/>
      <span className={`input__error ${errorText && 'input__error_visible'}`}>{errorText}</span>
    </article>
  )
}

export default Input;