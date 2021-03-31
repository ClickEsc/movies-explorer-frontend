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
  const [moviesSavedByUser, setMoviesSavedByUser] = React.useState([]);
  const [isSavedByUser, setIsSavedByUser] = React.useState(false);
  const [isPopupMenuOpen, setPopupMenuOpen] = React.useState(false);
  const [isHint, setIsHint] = React.useState(false);

  
  // Хук для попапа информирования об успешности регистрации
  const [infoTooltip, setInfoTooltip] = React.useState(undefined);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }
  
  function handleInfoTooltipContent(res) {
    if (res) {
      setInfoTooltip({
        src: tickMark,
        text: 'Вы успешно зарегистрировались!',
      });
    } else {
      setInfoTooltip({
        src: crossMark,
        text: 'Что-то пошло не так! Попробуйте ещё раз.',
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

  /*React.useEffect(() => {
    const movies = savedMovies.find((item) => item.owner === currentUser._id);
    setMoviesSavedByUser(movies);
    console.log(moviesSavedByUser)
  }, []);*/

  
    // Фильмы
  React.useEffect(() => {
    moviesApi.getInitialMovies()
      .then((movies) => {
        setInitialMovies(checkSavedMovies(movies, savedMovies));
      })
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
          setError('При авторизации произошла ошибка. Переданный токен некорректен.');
          console.log(`Ошибка при запросе токена: ${err.message}`)
        });  
    } else {
      setIsError(true);
      setError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
    }
  }

  // Cохранение токена для повторного входа пользователя без дополнительной авторизации
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleLogIn();
    }
    /*const searchResult = localStorage.getItem.JSON.parse('searchMovieResult');
    if (searchResult) {

    }*/
  }, []);

  // Регистрация пользователя
  function registerUser(name, email, password) {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          handleInfoTooltipContent(res);
          handleInfoTooltip();
          history.push('/signin');
        } else {
          handleInfoTooltipContent(res);
          handleInfoTooltip();
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка при попытке регистрации пользователя: ${err.message}`);
        if (err.message.indexOf('500' !== -1)) {
          setError('На сервере произошла ошибка.');
        } else if (err.message.indexOf('409' !== -1)) {
          setError('Пользователь с таким email уже существует.');
        }
      })
  }

  // Авторизация пользователя
  function authorizeUser(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          handleLogIn();
          history.push('/movies');
        }
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка при попытке входа пользователя: ${err.message}`)
        if (err.message.indexOf('500' !== -1)) {
          setError('На сервере произошла ошибка.');
        } else {
          setError('Вы ввели неправильный логин или пароль.');
        }
      });
  }

  function signOut() {
    setIsLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  // Изменение информации о пользователе
  function updateUserInfo(data) {
    mainApi.editUserInfo(data)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
        } else {
          setIsError(true);
        }
      })
      .catch(err => console.log(`Ошибка при редактировании информации о пользователе: ${err.message}`))
  }

 
  // Поиск по фильмам
  function searchInitialMovies(query) {
    setIsLoading(true);
    const queryItems = query.toLowerCase().split(' ');
    const result = [];
    for (let i = 0; i < queryItems.length; i+=1) {
      initialMovies.forEach((item) => {
        if (item.nameRU.toLowerCase().indexOf(" " + queryItems[i] + " " || queryItems[i] + " " || " " + queryItems[i]) !== -1) {
          result.push(item);
        }
      })
    }
    localStorage.setItem('searchMovieResult', JSON.stringify(result));
    setMoviesFoundBySearch(result);
    setIsLoading(false);
  }

  // Поиск по сохраненным фильмам
  function searchSavedMovies(query) {
    setIsLoading(true);
    const queryItems = query.toLowerCase().split(' ');
    const result = [];
    for (let i = 0; i < queryItems.length; i+=1) {
      savedMovies.forEach((item) => {
        if (item.nameRU.toLowerCase().indexOf(" " + queryItems[i] + " " || queryItems[i] + " " || " " + queryItems[i]) !== -1) {
          result.push(item);
        }
      })
    }
    setMoviesFoundBySearch(result);
    setIsLoading(false);
  }

  function checkSavedMovies(initialMovies, savedMovies) {
    savedMovies.forEach((savedMovie) => {
      initialMovies.find((item) => item.id === savedMovie.id).isSavedByUser = true;
      initialMovies.find((item) => item.id === savedMovie.id)._id = savedMovie._id;
    });
    return initialMovies;
  }

  /*React.useEffect(() => {
    savedMovies.forEach((item) => {
      if (item.owner === currentUser._id) {
        setMoviesSavedByUser([item, ...moviesSavedByUser]);
      }
      console.log(savedMovies);
      console.log(moviesSavedByUser);
    })
  }, [savedMovies])*/

  /*React.useEffect(() => {
    const result = localStorage.getItem('searchMovieResult');
    if (result) {
      setMoviesFoundBySearch(result);
    }
  }, []);*/

  // Добавление фильмов в сохраненные
  function addSavedMovie(movie) {
    if (!savedMovies.find((item) => item.id === movie.id)) {
      mainApi.addSavedMovie(movie)
        .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies]);
      })
      .catch(err => console.log(`Ошибка при добавлении фильма в сохраненные: ${err.message}`))
    }
  }

  // Удаление фильма из сохраненных
  function deleteSavedMovie(movie) {
    mainApi.deleteSavedMovie(movie)
      .then(() => {
        if (!movie._id) {
          movie._id = savedMovies.find((item) => item.id === movie.id);
        }
        const newMovieCards = savedMovies.filter((c) => c._id !== movie._id);
        setSavedMovies(newMovieCards);
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
              movies={savedMovies}
              onSearch={searchSavedMovies}
              onDelete={deleteSavedMovie}
              isLoading={false}
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
              error={isError}
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