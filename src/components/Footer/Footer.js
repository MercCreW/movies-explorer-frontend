import './Footer.css';

function Footer(){
    return(
        <section className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <nav className="footer__links">
                    <li className="footer__item"><a href="https://praktikum.yandex.ru/" className="footer__link">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a href="https://github.com/MercCreW" className="footer__link">Github</a></li>
                    <li className="footer__item"><a href="/" className="footer__link">Facebook</a></li>
                </nav>
            </div>
        </section>
    )
}

export default Footer;