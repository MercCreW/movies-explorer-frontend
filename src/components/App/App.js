import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Popup from '../Popup/Popup';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingError, setLoadingError] = React.useState('');
  
  // Стейты пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  let location = useLocation();
  
  // Стейты фильмов
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = React.useState([]);
  const [keyWord, setKeyWord] = React.useState('');

  // Стейты информационного сообщения
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  // проверка токена
  React.useEffect(() => {
    const path = location.pathname;
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token')
          history.push('/');
        });
    }
  }, []);
  
  // Получение списка всех фильмов
  React.useEffect(() => {
    if(loggedIn){
    moviesApi.getMovies()
    .then((data) => {
      localStorage.setItem('initialMovies', JSON.stringify(formatMovie(data)));
      const allMovie = JSON.parse(localStorage.getItem('initialMovies'));
      if (allMovie) {
        setInitialMovies(allMovie);
      }else{
        setInitialMovies(formatMovie(data));
      }
    })
    .catch((err) => {
      localStorage.removeItem('initialMovies');
      setLoadingError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    })
  }
}, [loggedIn])

  // Получение списка сохранённых фильмво
  React.useEffect(() => {
    if(loggedIn){
      mainApi.getMovies()
      .then((data) => {
        const savedMovies = data.map((item) => {
          return {...item, id: item.movieId}
        })
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        const saveMovie = JSON.parse(localStorage.getItem('savedMovies'))
        if(saveMovie){
          setSavedMovies(saveMovie);
        }else {
          setSavedMovies(savedMovies);
        }
      })
      .catch((err) => {
        localStorage.removeItem('savedMovies');
        setLoadingError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
    }
  }, [loggedIn])

  React.useEffect(() => {
    setFilterSavedMovies(filter(savedMovies, keyWord));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies])

  // регистрация
  function onSubmitRegister( data ) {
    console.log(data.nameInput);
    if (!data.nameInput || !data.emailInput || !data.passwordInput) {
      return;
    }
    mainApi.register(data.nameInput, data.emailInput, data.passwordInput)
      .then((res) => {
        if (res) {
          login(res.email, res.password);
        }
      })
      .catch(err => {
        if (err.status === 409) {
          setMessage('Пользователь с таким email уже существует');
          setIsInfoTooltipOpen(true);
        } else {
          setMessage('При регистрации пользователя произошла ошибка');
          setIsInfoTooltipOpen(true);
        }
      })
  }

  // авторизация
  function login(email, password) {
    mainApi.login(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        getCurrentUser();
        history.push('/movies');
      }
    })
    .catch(err => {
      if (err.status === 400) {
        setMessage('Неверный email или пароль');
        setIsInfoTooltipOpen(true);
      } else {
        setMessage('При авторизации произошла ошибка');
        setIsInfoTooltipOpen(true);
      }
    })
  }

  function onSubmitLogin(user) {
    if (!user.emailInput || !user.passwordInput) {
      return;
    }
    login(user.emailInput, user.passwordInput);
  }

  // получить данные текущего пользователя 
  function getCurrentUser() {
    const token = localStorage.getItem('token');
    mainApi.getCurrentUser(token)
      .then((res) => {
        if (res) {
          setCurrentUser(res)
          localStorage.setItem('currentUser', JSON.stringify(res));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  // редактирование профиля 
  function handleSaveProfile(data) {
    mainApi.saveProfile(data)
      .then((profile) => {
        setCurrentUser(profile);
        setMessage('Профиль успешно обновлен');
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        if (err.status === 409) {
          setMessage('Пользователь с таким email уже существует');
        } else {
          setMessage('При обновлении профиля произошла ошибка');
        }
        setIsInfoTooltipOpen(true);
      })
  }

  // выход 
  function handleSignOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setLoggedIn(false);
      setCurrentUser({})

      localStorage.removeItem('initialMovies');
      localStorage.removeItem('savedMovies');
      setInitialMovies([]);
      setSavedMovies([]);
      setFilterMovies([]);
      setFilterSavedMovies([]);

      history.push('/');
  }

  function formatMovie(movies){
    return movies.map((item)=>{
      return {
        ...item,
        image: item.image? `https://api.nomoreparties.co${item.image.url}` : '',
        thumbnail: item.image ? `https://api.nomoreparties.co${item.image.formats.thumbnail.url}` : '',
        trailer: item.trailerLink,
        movieId: item.id,
      }
    })
  }


  function isSavedMovie(movie) {
    return savedMovies.some((item) => item.id === movie.movieId)
  }

  function filter(data, keyWord) {
    if (keyWord) {
      const filterData = data.filter((item) => (item.nameRU.toLowerCase().includes(keyWord.toLowerCase())));
      if (filterData.length === 0) {
        setLoadingError('Ничего не найдено');
      } else {
        setLoadingError('');
      }
      return filterData;
    }
    return [];
  }

  // Поиск фильмов в массиве инициализируемых фильмов
  function onSubmitSearch(keyWord) {
    setIsLoading(true);
    setTimeout(() => {
      setKeyWord(keyWord);
      setFilterMovies(filter(initialMovies, keyWord));
      setIsLoading(false);
    }, 1000)
  }

  // Поиск фильмов в массиве сохраненных фильмов
  function onSubmitSearchSaved(keyWord) {
    setIsLoading(true);
    setTimeout(() => {
      setKeyWord(keyWord);
      setFilterSavedMovies(filter(savedMovies, keyWord));
      setIsLoading(false);
    }, 1000)
  }

// Фнукция для добавление или удаления фильмов
  function onBookmarkClick(movie, isMarked) {
    if (isMarked) {
      addMovie(movie);
    } else {
      deleteMovie(movie);
    }
  }

// удаление фильма из избранных
  function deleteMovie(movie) {
    const deleteMovieId = savedMovies.find((item) => item.id === movie.id)._id;
    mainApi.deleteMovies(deleteMovieId)
    .then((res) => {
      if (res) {
        const newArray = savedMovies.filter((item) => item.movieId !== res.deleteMovieId);
        console.log(newArray);
        setSavedMovies(newArray);
      }
    })
    .catch((err) => {
      setMessage('На сервере произошла ошибка');
      setIsInfoTooltipOpen(true);
    })
  }

  //добавление в избранное
  function addMovie(movie) {
    mainApi.createMovie(movie)
    .then((res) => {
      setSavedMovies([...savedMovies, {...res, id: res.movieId}])
   })
    .catch((err) => {
      setMessage('На сервере произошла ошибка');
      setIsInfoTooltipOpen(true);
    })
  }
  
// Закрыть попап и очистить сообщение
  function onClosePopup() {
    setIsInfoTooltipOpen(false);
    setMessage('');
  }


  return (
    <div className="appPage"> 
    <CurrentUserContext.Provider value={currentUser}>


    { (loggedIn || location.pathname === '/') && <Header loggedIn= {loggedIn}/> }
    
      <Switch>
        
        <Route exact path="/">
          <Main loggedIn= {loggedIn}/>
          <Footer />
        </Route>
        
        <ProtectedRoute path="/movies"
         loggedIn={loggedIn} 
         isLoading={isLoading}
         loadingError={loadingError}
         component={Movies}   
         savedMovies={false} 
         movies={filterMovies}
         onSubmitSearch={onSubmitSearch}
         onBookmarkClick={onBookmarkClick}
         isSavedMovie={isSavedMovie}
         >
        </ProtectedRoute>

        <ProtectedRoute path="/saved-movies"
            loggedIn={loggedIn} 
            isLoading={isLoading}
            loadingError={loadingError}
            component={Movies}   
            savedMovies={true}
            movies={filterSavedMovies}
            onSubmitSearch={onSubmitSearchSaved}
            onBookmarkClick={onBookmarkClick}
            isSavedMovie={isSavedMovie}>
          <Footer />
        </ProtectedRoute>

        <ProtectedRoute path="/profile"             
            loggedIn={loggedIn} 
            component={Profile}   
            onSaveProfile={handleSaveProfile} 
            onSignOut={handleSignOut}
        />

        <Route path='/signup'>
          <Register onSubmitRegister={onSubmitRegister} />
        </Route>

        <Route path='/signin'>
          <Login onSubmitLogin={onSubmitLogin} />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <Popup 
          title={message} 
          isOpenPopup={isInfoTooltipOpen} 
          onClosePopup={onClosePopup}
        />      

    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
