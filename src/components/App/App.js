import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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

import './App.css';

function App() {
  
  const history = useHistory();

  return (
    <div className="app">
      <div className="app__container">
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header />
            <SearchForm />
            <Movies isLoading={false} />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header />
            <SearchForm />
            <SavedMovies />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/signin">
            <Header />
            <Login />
          </Route>
          <Route path="/signup">
            <Header />
            <Register />
          </Route>
          <Route path="/*">
            <NotFound history={history} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;