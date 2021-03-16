import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import photo  from '../../images/frontEndDeveloper.png';

function AboutMe() {
  return(
    <section className="AboutMe">
        <SectionTitle title="Студент" />
        <div className="aboutMe__container">
          <div className="aboutMe__info">
            <h2 className="aboutMe__subtitle">Алексей</h2>
            <p className="aboutMe__brief">Фронтенд-разработчик, 32 года</p>
            <p className="aboutMe__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб&#8209;разработке, 
            начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.</p>
            <ul className="aboutMe__links">
              <li className="aboutMe__links-item">
                <a className="aboutme__link" href="/">Facebook</a></li>
              <li className="aboutMe__links-item">
                <a className="aboutme__link" href="https://github.com/MercCreW">Github</a></li>
            </ul>
          </div>
        <img className="aboutMe__photo" src={photo} alt="Фотография разработчика сайта" />
        </div>
        


    </section>

  )
}
export default AboutMe;