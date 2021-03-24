import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main({loggedIn}) {
  return(
    <main className="mainContent">
        {/* <Header loggedIn= {loggedIn}/> */}
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
    </main>
  )
}
export default Main;