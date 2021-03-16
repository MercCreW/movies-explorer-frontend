import { NavLink } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({name, submitText, linkText, link, linkSubText, isSubmitDisabled, handleOnSubmit,...props}) {
  return (
    
    <form className="form" action="post" name={name} noValidate onSubmit={handleOnSubmit}>
      { 
        props.children 
      }
      <div className="form__footer">
      <button className={`form__submit ${isSubmitDisabled && 'form__submit_disabled'}`} 
          disabled={isSubmitDisabled}>{submitText}</button>
        <p className="form__text">{linkSubText}
          <NavLink className="form__link" to={link}>{linkText}</NavLink>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;