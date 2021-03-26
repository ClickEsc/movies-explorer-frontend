import React from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
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
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isPopupMenuOpen, setPopupMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setPopupMenuOpen(true);
  }

  function closeAllPopups() {
    setPopupMenuOpen(false);
  }

  // Фильмы
  React.useEffect(() => {
    moviesApi.getInitialMovies()
      .then((movies) => {
        setInitialMovies(movies);
      })
  }, [isLoggedIn]);

  React.useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        console.log(movies);
        setSavedMovies(movies);
      })
  }, [isLoggedIn]);
  
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
            history.push('/');
          }
        })
        .catch(err => console.log(`Ошибка при запросе токена: ${err.message}`));
    }
  }

  // Cохранение токена для повторного входа пользователя без дополнительной авторизации
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleLogIn();
    }
  }, []);

  // Регистрация пользователя
  function registerUser(name, email, password) {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          console.log(res);
          history.push('/signin');
        } else {
          return
        }
    })
      .catch(err => console.log(`Ошибка при попытке регистрации пользователя: ${err.message}`));
  }

  // Авторизация пользователя
  function authorizeUser(email, password) {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          handleLogIn();
          history.push('/');
        }
      })
      .catch(err => console.log(`Ошибка при попытке входа пользователя: ${err.message}`));
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(err => console.log(`Ошибка при обращении за информацией о пользователе: ${err.message}`))
    }
  }, [isLoggedIn]);

  // Изменение информации о пользователе
  function updateUserInfo(currentUser) {
    mainApi.editUserInfo(currentUser)
      .then((res) => {
        setCurrentUser(res);
    })
    .catch(err => console.log(`Ошибка при редактировании информации о пользователе: ${err.message}`))
  }

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
              <Login onLogin={authorizeUser} isMobile={isMobile} isSuperMobile={isSuperMobile} />
            </Route>
            <Route path="/signup">
              <Register onRegister={registerUser} isMobile={isMobile} isSuperMobile={isSuperMobile} />
            </Route>
            <ProtectedRoute
              path="/movies"
              loggedIn={isLoggedIn}
              component={Movies}
              movies={initialMovies}
              isLoading={false}
              isMobile={isMobile}
              isSuperMobile={isSuperMobile} />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={isLoggedIn}
              component={SavedMovies}
              movies={savedMovies}
              isLoading={false}
              isMobile={isMobile}
              isSuperMobile={isSuperMobile} />
            <ProtectedRoute
              path="/profile"
              loggedIn={isLoggedIn}
              component={Profile}
              onProfileUpdate={updateUserInfo}
              isMobile={isMobile}
              isSuperMobile={isSuperMobile} />
            <Route path="/*">
              <NotFound history={history} />
            </Route>
          </Switch>
          <Footer />
          <PopupMenu isOpen={isPopupMenuOpen} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;