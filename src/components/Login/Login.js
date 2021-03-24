import React from 'react';
import './Login.css';
import srcLogo from '../../images/Logo.svg';
import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

import { getErrorEmail, getErrorPassword } from '../../utils/formValidator';

function Login({onSubmitLogin}) {
  const [emailInput, setEmailInput] = React.useState('');
  const [failEmail, setFailEmail] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [failPassword, setFailPassword] = React.useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);

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
    setIsSubmitDisabled( failEmail || failPassword )
  },[failEmail, failPassword])

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitLogin({ emailInput, passwordInput });
  }

  return (
    <section className="login">
      <NavLink to="/" className="logo"><img src={srcLogo} alt="Логотип"/></NavLink>
      <h2 className="login__title">Рады видеть!</h2>

      <AuthForm
        name="login"
        submitText="Войти"
        linkText="Регистрация"
        linkSubText="Ещё не зарегистрированы?"
        link="/signup"
        isSubmitDisabled={isSubmitDisabled}
        handleOnSubmit={handleOnSubmit}
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          minLength="5"
          maxLength="100"
          errorText={failEmail}
          onChange={handleEmailInputChange}
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          errorText="Что-то пошло не так..."
          minLength="5"
          errorText={failPassword}
          onChange={handlePasswordInputChange}
        /> 
      </AuthForm>

    </section>
  );
}

export default Login;