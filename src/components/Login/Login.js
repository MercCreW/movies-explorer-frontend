import React from 'react';
import './Login.css';
import srcLogo from '../../images/Logo.svg';
import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

import { getErrorText, checkValid } from '../../utils/formValidator';

function Login({onSubmitLogin}) {

  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
  });

  function handleInputChange(evt) {
    const { name, value } = evt.target;   
    setFormValues({
      ...formValues,
      [name] : value 
    });
  }

  /** валидация формы **/
  const [errors, setErrors] = React.useState({
    email: {
      required: '',
      minLength: '',
      isEmail: '',
    },
    password: {
      required: '',
      minLength: '',
    },
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);
  
  React.useEffect(() => {
    const { email, password } = formValues;

    const emailValid = checkValid('email', email);
    const passwordValid = checkValid('password', password);

    setErrors({
      email: emailValid,
      password: passwordValid,
    });

    const isEmailValid = Object.values(emailValid).every((item) => item === '');
    const isPasswordValid = Object.values(passwordValid).every((item) => item === '');
    
    setIsSubmitDisabled(!isEmailValid || !isPasswordValid);   

  }, [formValues]);


  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSubmitLogin(formValues);
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
          errorText={getErrorText(errors.email)}
          onChange={handleInputChange}
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          errorText="Что-то пошло не так..."
          minLength="5"
          errorText={getErrorText(errors.password)}
          onChange={handleInputChange}
        /> 
      </AuthForm>

    </section>
  );
}

export default Login;