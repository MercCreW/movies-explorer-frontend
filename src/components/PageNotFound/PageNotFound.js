import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  
  const history = useHistory();

  return (
    <section className="notFound">
      <h2 className="notFound__title">404</h2>
      <p className="notFound__text">Страница не найдена</p>
      <button className="notFound__button-back" onClick={() => history.goBack()}>Назад</button>
    </section>
  );
}

export default PageNotFound;