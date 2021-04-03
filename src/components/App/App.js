import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import PopupMenu from '../PopupMenu/PopupMenu';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

import tickMark from '../../images/tick-mark.svg';
import crossMark from '../../images/cross-mark.svg';
import {
  SIGNUP_OK_MSG,
  PROFILE_UPDATE_OK_MSG,
  PROFILE_UPDATE_FAIL_MSG,
  RES_ERROR_MSG,
  INCORRECT_TOKEN_MSG,
  NO_TOKEN_MSG,
  SERVER_ERROR_MSG,
  EMAIL_CONFLICT_MSG,
  BAD_AUTH_DATA_MSG } from '../../utils/constants';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import './App.css';

function App() {
  
  const history = useHistory();

  const location = useLocation();
  const path = location.pathname;

  const isMobile = useMediaQuery({ query: `(max-width: 850px)` });

  const isSuperMobile = useMediaQuery({ query: `(max-width: 500px)` });
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: ''});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [moviesFoundBySearch, setMoviesFoundBySearch] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [error, setError] = React.useState('');
  const [isSavedMoviesError, setIsSavedMoviesError] = React.useState(false);
  const [moviesSavedByUser, setMoviesSavedByUser] = React.useState([]);
  const [isPopupMenuOpen, setPopupMenuOpen] = React.useState(false);
  
  // Хук для попапа информирования об успешности регистрации
  const [infoTooltip, setInfoTooltip] = React.useState({ src: '', text: ''});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  
  function handleInfoTooltipContent(res, message) {
    if (res) {
      setInfoTooltip({
        src: tickMark,
        text: message,
      });
    } else {
      setInfoTooltip({
        src: crossMark,
        text: RES_ERROR_MSG,
      });
    }
  }

  function handleMenuClick() {
    setPopupMenuOpen(true);
  }

  function closeAllPopups() {
    setPopupMenuOpen(false);
    setInfoTooltipOpen(false);
  }

  // Фильмы
  React.useEffect(() => {
    moviesApi.getInitialMovies()
      .then((movies) => {
        localStorage.setItem('initialMovies', movies);
        setInitialMovies(movies);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе фильмов: ${err.message}`)
      });  
  }, []);

  // Сохранённые фильмы
  React.useEffect(() => {
    const ownMovies = savedMovies.filter((item) => item.owner === currentUser._id);
    setMoviesSavedByUser(ownMovies);
  }, [savedMovies]);
  
  // Проверка токена и вход
  function handleLogIn() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      mainApi.getToken(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => {
          setIsError(true);
          setError(INCORRECT_TOKEN_MSG);
          console.log(`Ошибка при запросе токена: ${err.message}`)
        });  
    } else {
      setIsError(true);
      setError(NO_TOKEN_MSG);
    }
  }

  // Cохранение токена для повторного входа пользователя без дополнительной авторизации
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleLogIn();
    }
    const searchMoviesResult = JSON.parse(localStorage.getItem('searchMoviesResult'));
    if (searchMoviesResult) {
      setMoviesFoundBySearch(searchMoviesResult);
    }
    const searchSavedMoviesResult = JSON.parse(localStorage.getItem('searchSavedMoviesResult'));
    if (searchSavedMoviesResult) {
      setMoviesSavedByUser(searchSavedMoviesResult);
    }
  }, []);

  // Регистрация пользователя
  function registerUser(name, email, password) {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setIsError(false);
          setError('');
          handleInfoTooltipContent(res, SIGNUP_OK_MSG);
          setInfoTooltipOpen(true);
          history.push('/signin');
        } else {
          handleInfoTooltipContent(res);
          setInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка при попытке регистрации пользователя: ${err.message}`);
        if (err.message.indexOf('500' !== -1)) {
          setError(SERVER_ERROR_MSG);
        } else if (err.message.indexOf('409' !== -1)) {
          setError(EMAIL_CONFLICT_MSG);
        }
      })
  }

  // Авторизация пользователя
  function authorizeUser(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsError(false);
          setError('');
          setIsLoggedIn(true);
          handleLogIn();
          history.push('/movies');
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка при попытке входа пользователя: ${err.message}`)
        if (err.message.indexOf('500' !== -1)) {
          setError(SERVER_ERROR_MSG);
        } else {
          setError(BAD_AUTH_DATA_MSG);
        }
      });
  }

  function signOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('initialMovies');
    localStorage.clear();
    history.push('/');
  }

  // Изменение информации о пользователе
  function updateUserInfo(data) {
    mainApi.editUserInfo(data)
      .then((res) => {
        if (res) {
          setIsError(false);
          setError('');
          setCurrentUser(res);
          handleInfoTooltipContent(res, PROFILE_UPDATE_OK_MSG);
          setInfoTooltipOpen(true);
        } else {
          setIsError(true);
          handleInfoTooltipContent(res);
          setInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка при редактировании информации о пользователе: ${err.message}`);
        if (err.message.indexOf('500' !== -1)) {
          setError(SERVER_ERROR_MSG);
        } else {
          setError(PROFILE_UPDATE_FAIL_MSG);
        }
      })
  }

 
  // Поиск по фильмам
  function searchInitialMovies(query) {
    setIsLoading(true);
    const queryItems = query.toLowerCase().split(' ');
    const result = [];
    for (let i = 0; i < queryItems.length; i+=1) {
      initialMovies.forEach((item) => {
        if ((item.nameRU !== null && item.nameRU.toLowerCase().indexOf(queryItems[i]) !== -1) || (item.nameEN !== null && item.nameEN.toLowerCase().indexOf(queryItems[i]) !== -1)) {
          result.push(item);
        }
      })
    }
    localStorage.setItem('moviesQuery', JSON.stringify(query));
    localStorage.setItem('searchMoviesResult', JSON.stringify(result));
    setMoviesFoundBySearch(result);
    setIsLoading(false);
  }

  // Поиск по сохраненным фильмам
  function searchSavedMovies(query) {
    setIsLoading(true);
    const queryItems = query.toLowerCase().split(' ');
    const result = [];
    for (let i = 0; i < queryItems.length; i+=1) {
      moviesSavedByUser.forEach((item) => {
        if ((item.nameRU.toLowerCase().indexOf(queryItems[i]) !== -1) || (item.nameEN.toLowerCase().indexOf(queryItems[i]) !== -1)) {
          result.push(item);
        }
      })
    }
    localStorage.setItem('savedMoviesQuery', JSON.stringify(query));
    localStorage.setItem('searchSavedMoviesResult', JSON.stringify(result));
    setMoviesSavedByUser(result);
    if (query.length > 0 && result.length === 0) {
      setIsSavedMoviesError(true);
    }
    setIsLoading(false);
  }

  // Добавление фильмов в сохраненные
  function addSavedMovie(movie) {
    if (!moviesSavedByUser.find((item) => item.id === movie.id)) {
      mainApi.addSavedMovie(movie)
        .then((newSavedMovie) => {
          setMoviesSavedByUser([...moviesSavedByUser, newSavedMovie]);
      })
      .catch(err => console.log(`Ошибка при добавлении фильма в сохраненные: ${err.message}`))
    }
  }

  // Удаление фильма из сохраненных
  function deleteSavedMovie(movie) {
    const savedMovie = moviesSavedByUser.find((item) => item.id === movie.id);
    mainApi.deleteSavedMovie({ _id: savedMovie._id })
      .then(() => {
        const newMovieCards = moviesSavedByUser.filter((c) => c._id !== savedMovie._id);
        setMoviesSavedByUser(newMovieCards);
      })
      .catch(err => console.log(`Ошибка при удалении фильма из сохраненных: ${err.message}`))
  }

  // Первичная загрузка данных о пользователе и сохраненных фильмах
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([userInfo, savedMovieCards]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovieCards);
        })
        .catch(err => console.log(`Ошибка первичной загрузки данных о пользователе и сохраненных фильмах: ${err.message}`))
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div
          className="app__container"
          style={(path === "/signin" || path === "/signup") && isMobile
            ? {display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}
            : {display: "block"}}
        >
          <Header loggedIn={isLoggedIn} isMobile={isMobile} isSuperMobile={isSuperMobile} onMenuClick={handleMenuClick} />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/signin">
              <Login onLogin={authorizeUser} isError={isError} error={error} isMobile={isMobile} isSuperMobile={isSuperMobile} />
            </Route>
            <Route path="/signup">
              <Register onRegister={registerUser} isError={isError} error={error} isMobile={isMobile} isSuperMobile={isSuperMobile} />
            </Route>
            <ProtectedRoute
              path="/movies"
              loggedIn={isLoggedIn}
              component={Movies}
              movies={moviesFoundBySearch}
              savedMovies={moviesSavedByUser}
              onSearch={searchInitialMovies}
              onSave={addSavedMovie}
              onDelete={deleteSavedMovie}
              isLoading={isLoading}
              isMobile={isMobile}
              isSuperMobile={isSuperMobile}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={isLoggedIn}
              component={SavedMovies}
              movies={moviesSavedByUser}
              onSearch={searchSavedMovies}
              onDelete={deleteSavedMovie}
              isLoading={isLoading}
              isError={isSavedMoviesError}
              isMobile={isMobile}
              isSuperMobile={isSuperMobile}
            />
            <ProtectedRoute
              path="/profile"
              loggedIn={isLoggedIn}
              component={Profile}
              onProfileUpdate={updateUserInfo}
              onSignOut={signOut}
              isMobile={isMobile}
              isError={isError}
              error={error}
              isSuperMobile={isSuperMobile}
            />
            <Route path="/*">
              <NotFound history={history} />
            </Route>
          </Switch>
          <Footer />
          <PopupMenu isOpen={isPopupMenuOpen} onClose={closeAllPopups} />
          <InfoToolTip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} content={infoTooltip}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;