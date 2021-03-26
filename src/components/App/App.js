import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
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
import { pathname } from '../../utils/constants';


function App() {
  
  const history = useHistory();

  const isMobile = useMediaQuery({ query: `(max-width: 850px)` });

  const isSuperMobile = useMediaQuery({ query: `(max-width: 500px)` });
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [initialMovies, setInitialMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isPopupMenuOpen, setPopupMenuOpen] = React.useState(false);

  function handleMenuClick() {
    setPopupMenuOpen(true);
  }

  function closeAllPopups() {
    setPopupMenuOpen(false);
  }

  /*// Фильмы
  React.useEffect(() => {
    moviesApi.getInitialMovies()
      .then((movies) => {
        setInitialMovies(movies);
      })
  }, []);

  React.useEffect(() => {
    mainApi.getSavedMovies()
      .then((movies) => {
        console.log(movies);
        setSavedMovies(movies);
      })
  }, []);*/

  function handleLogIn() {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      mainApi.getToken(token)
        .then((res) => {
          if (res) {
            /*setCurrentUser(res.data);*/
            setIsLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => console.log(`Ошибка при запросе токена: ${err.message}`));
    }
  }

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

  return (
    <div className="app">
      <div
        className="app__container"
        style={(pathname === "/signin" || pathname === "/signup") && isMobile
          ? {display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}
          : {display: "block"}}
      >
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn} isMobile={isMobile} onMenuClick={handleMenuClick} />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            {!isPopupMenuOpen ?
              <>
                <Header isMobile={isMobile} isSuperMobile={isSuperMobile} onMenuClick={handleMenuClick} />
                <SearchForm />
                <Movies movies={initialMovies} isLoading={false} isMobile={isMobile} isSuperMobile={isSuperMobile} />
                <Footer />
              </>
            : ''}
          </Route>
          <Route path="/saved-movies">
            <Header isMobile={isMobile} isSuperMobile={isSuperMobile} onMenuClick={handleMenuClick} />
            <SearchForm />
            <SavedMovies movies={savedMovies} isLoading={false} isMobile={isMobile} isSuperMobile={isSuperMobile} />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header isMobile={isMobile} isSuperMobile={isSuperMobile} onMenuClick={handleMenuClick} />
            <Profile />
          </Route>
          <Route path="/signin">
            <Header isMobile={isMobile} isSuperMobile={isSuperMobile} onMenuClick={handleMenuClick} />
            <Login onLogin={authorizeUser} isMobile={isMobile} isSuperMobile={isSuperMobile} />
          </Route>
          <Route path="/signup">
            <Header isMobile={isMobile} isSuperMobile={isSuperMobile} onMenuClick={handleMenuClick} />
            <Register onRegister={registerUser} isMobile={isMobile} isSuperMobile={isSuperMobile} />
          </Route>
          <Route path="/*">
            <NotFound history={history} />
          </Route>
        </Switch>
        <PopupMenu isOpen={isPopupMenuOpen} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;