import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import { getErrorText, checkValid } from '../../utils/formValidator.js';
import './Profile.css';


function Profile({onSaveProfile, onSignOut}) {
    const [viewMode, setViewMode] = React.useState(true);
  
    function handleEditClick(evt) {
      evt.preventDefault();
      setViewMode(false) 
    }

    const [formValues, setFormValues] = React.useState({
        name: '',
        email: ''
      });
      
      const currentUser = React.useContext(CurrentUserContext);
      React.useEffect(() => {
        setFormValues({
          ...formValues,
          name: currentUser.name || '',
          email: currentUser.email || ''
        })
      }, [currentUser]);
    
      function handleInputChange(evt) {
        const { name, value } = evt.target;   
        setFormValues({
          ...formValues,
          [name] : value 
        });
      }
    
      /** валидация формы **/
      const [errors, setErrors] = React.useState({
        name: {
          required: '',
          minLength: '',
          maxLength: '',
        },
        email: {
          required: '',
          minLength: '',
          isEmail: '',
        },
      });
      const [isNameValid, setIsNameValid] = React.useState(false);
      const [isEmailValid, setIsEmailValid] = React.useState(false);
      const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
    
      React.useEffect(() => {
        
        const { name, email } = formValues;
        
        const nameValid = checkValid('name', name);
        const emailValid = checkValid('email', email);
    
        setErrors({
          name: nameValid,
          email: emailValid,
        });
    
        const nameVal = Object.values(nameValid).every((item) => item === '');
        const emailVal = Object.values(emailValid).every((item) => item === '');
        setIsNameValid(nameVal);
        setIsEmailValid(emailVal);
        
        setIsSubmitDisabled(!nameVal || !emailVal );   
    
      }, [formValues]);
    
      /* кнопка выйти из аккаунта */
      function handleSignOut() {
        onSignOut();
      }
    
      /* кнопка сохранить */
      function handleOnSubmit(evt) {
        evt.preventDefault();
        onSaveProfile(formValues);
      }

    

    return (
       <section className="profile">
           <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
           <form className="profile__form" action="post" name="profile" noValidate onSubmit={handleOnSubmit}>
               <label className="profile__label">Имя
               <input className="profile__input profile__input_type_name" id="name-input" type="text" 
                                 name="name" placeholder="Имя" required minLength="2" maxLength="30" 
                                 value={formValues.name} onChange={handleInputChange}/>
               </label>
               <label className="profile__label">Почта
               <input className="profile__input profile__input_type_email" id="email-input" type="text"
                                 name="email" placeholder="Почта" required minLength="5" maxLength="100" 
                                 value={formValues.email} onChange={handleInputChange}/>
               </label>
               <div className="profile__buttons">
                   {viewMode ? (
                       <>
                            <button className="profile__button profile__button_type_edit" onClick={handleEditClick}>Редактировать</button>
                            <button className="profile__button profile__button_type_signout" onClick={handleSignOut}>Выйти из аккаунта</button>
                       </>
                   ) 
                   :(
                    <>
                        <span className="profile__error" id="profile-input-error">При обновлении профиля произошла ошибка.</span>
                        <button className="profile__button profile__button_type_save-profile">Cохранить</button>
                    </>
                   )
                } 
               </div>
           </form>

       </section>
    );
}

export default Profile;
