import { NavLink } from 'react-router-dom';
import './AuthForm.css';

function AuthForm({name, submitText, linkText, link, linkSubText,...props}) {
  return (
    
    <form className="form" action="post" name={name} noValidate>
      { 
        props.children 
      }
      <div className="form__footer">
        <button className="form__submit">{submitText}</button>
        <p className="form__text">{linkSubText}
          <NavLink className="form__link" to={link}>{linkText}</NavLink>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;