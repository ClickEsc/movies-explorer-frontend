import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
/*import Header from '../Header/Header';*/
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';

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
            <Navigation />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <SearchForm />
            <Movies isLoading={false} />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <SearchForm />
            <Footer />
          </Route>
          <Route path="/profile">
            <Navigation />
            <Profile />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
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