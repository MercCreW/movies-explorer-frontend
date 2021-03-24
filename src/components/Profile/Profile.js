import React from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import { getErrorText, checkValid, getErrorName, getErrorEmail, } from '../../utils/formValidator.js';
import './Profile.css';


function Profile({onSaveProfile, onSignOut}) {
    const [viewMode, setViewMode] = React.useState(true);
  
    function handleEditClick(evt) {
      evt.preventDefault();
      setViewMode(false) 
    }

    const [nameInput, setNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [failName, setFailName] = React.useState('');
    const [failEmail, setFailEmail] = React.useState('');

      const currentUser = React.useContext(CurrentUserContext);
      React.useEffect( () => {
        setNameInput(currentUser.name || '');
        setEmailInput(currentUser.email || '');
      }, [currentUser]);

    
      function handleNameInputChange(evt){
        setNameInput(evt.target.value);
      }
      React.useEffect(()=>{
        setFailName(getErrorName(nameInput));
      },[nameInput])
    
    
      function handleEmailInputChange(evt){
        setEmailInput(evt.target.value);
      }
      React.useEffect(()=>{
        setFailEmail(getErrorEmail(emailInput));
      },[emailInput])

      const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

    
      React.useEffect(()=>{
        setIsSubmitDisabled(failName || failEmail)
      },[failName, failEmail])

    
      /* кнопка выйти из аккаунта */
      function handleSignOut() {
        onSignOut();
      }
    
      /* кнопка сохранить */
      function handleOnSubmit(evt) {
        evt.preventDefault();
        onSaveProfile({nameInput, emailInput});
        setViewMode(true);
      }

    

    return (
       <section className="profile">
           <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
           <form className="profile__form" action="post" name="profile" noValidate onSubmit={handleOnSubmit}>
               <article className="profile__info-container">
                 <label className="profile__label">Имя
                    <input className="profile__input profile__input_type_name" id="name-input" type="text"
                    name="name" placeholder="Имя" required minLength="2" maxLength="30" 
                    value={nameInput} onChange={handleNameInputChange}/>
                 </label>
               <span className={`profile__error ${failName && 'profile__error-visible'}`}>{failName}</span>
               </article>
               <article className="profile__info-container">
                  <label className="profile__label">Почта
                      <input className="profile__input profile__input_type_email" id="email-input" type="text"
                                 name="email" placeholder="Почта" required minLength="5" maxLength="100" 
                                 value={emailInput} onChange={handleEmailInputChange}/>
                  </label>
               </article>
               <span className={`profile__error ${emailInput && 'profile__error-visible'}`}>{failEmail}</span>
               <div className="profile__buttons">
                   {viewMode ? (
                       <>
                            <button className={`profile__button profile__button_type_edit ${isSubmitDisabled && 'profile__button_disabled'}`} 
                            onClick={handleEditClick} disabled={isSubmitDisabled}>Редактировать</button>
                            <button className="profile__button profile__button_type_signout" onClick={handleSignOut}>Выйти из аккаунта</button>
                       </>
                   ) 
                   :(
                    <>
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
