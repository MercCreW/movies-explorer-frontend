import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="appPage"> 
    { loggedIn && <Header loggedIn= {loggedIn}/> }
    
      <Switch>
        
        <Route exact path="/">
          <Main loggedIn= {loggedIn}/>
          <Footer />
        </Route>
        
        <Route path="/movies">
          <Movies savedMovies={false}/>
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Movies savedMovies={true}/>
          <Footer />
        </Route>

        <Route path="/profile">
          <Profile/>
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

    
    </div>

  );
}

export default App;
