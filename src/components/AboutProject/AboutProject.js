import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return(
    <section className="AboutProject"  id="project">
        <SectionTitle title="О проекте" />
        <ul className="aboutProject__content">
            <li className="aboutProject__content-item">
                <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="aboutProject__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className="aboutProject__content-item">
                <h3 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="aboutProject__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
        </ul>
        <div className="progress-bar">
            <div className="progress-bar__item progress-bar__item_color_blue">1 неделя</div>
            <div className="progress-bar__item progress-bar__item_color_grey">4 недели</div>
            <div className="progress-bar__description">Back-end</div>
            <div className="progress-bar__description">Front-end</div>
        </div>

    </section>

  )
}
export default AboutProject;