import './Register.css';
import srcLogo from '../../images/Logo.svg';
import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';

function Register() {
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
      >
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Имя"
          errorText=""
          minLength="2"
          maxLength="30"
        />  
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          errorText="Что-то пошло не так..."
          minLength="5"
          maxLength="100"
        />  
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          errorText="Что-то пошло не так..."
          minLength="5"
        /> 
      </AuthForm>

    </section>
  );
}

export default Register;