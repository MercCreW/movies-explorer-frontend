import './Promo.css';
import promoLogo from '../../images/promoWorldWeb.svg';

function Main() {
  return(
    <section className="promo">
        <div className="content">
            <div>
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            </div>
           <img className="promo__logo" src={promoLogo} alt="Словом web заполнена окружность и одна меридиана." />
        </div>
        <div className="promo__button"><a href="#project" className="promo__link">Узнать больше</a></div>
    </section>
  )
}
export default Main;