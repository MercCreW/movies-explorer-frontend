import './Register.css';
import srcLogo from '../../images/Logo.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

import { getErrorName, getErrorEmail, getErrorPassword} from '../../utils/formValidator';

function Register({onSubmitRegister}) {

  const [nameInput, setNameInput] = React.useState('');
  const [failName, setFailName] = React.useState('');
  const [emailInput, setEmailInput] = React.useState('');
  const [failEmail, setFailEmail] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [failPassword, setFailPassword] = React.useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

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


  function handlePasswordInputChange(evt){
    setPasswordInput(evt.target.value);
  }
  React.useEffect(()=>{
    setFailPassword(getErrorPassword(passwordInput));
  },[passwordInput])

  React.useEffect(()=>{
    setIsSubmitDisabled(failName || failEmail || failPassword)
  },[failName, failEmail, failPassword])


  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitRegister( {nameInput, emailInput, passwordInput} );
  }


  return (


    <section className="register">
      <NavLink to="/" className="logo"><img src={srcLogo} alt="Логотип"/></NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>

      <AuthForm
        name="register"
        submitText="Зарегистрироваться"
        linkText="Войти"
        linkSubText="Уже зарегистрированы?"
        link="/signin"
        isSubmitDisabled={isSubmitDisabled}
        handleOnSubmit={handleOnSubmit}
      >
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          errorText={failName}
          required         
          minLength="2"
          maxLength="30"
          onChange={handleNameInputChange}
        />  
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          errorText={failEmail}
          minLength="5"
          maxLength="100"
          onChange={handleEmailInputChange}
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          errorText={failPassword}
          minLength="5"
          onChange={handlePasswordInputChange}
        /> 
      </AuthForm>

    </section>
  );
}

export default Register;