import { baseUrlForImages, noData, noImagePic, noVideoPic } from './constants';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  
  // Показать ошибку в консоли
  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  // Получить список сохраненных фильмов в виде массива
  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._handlePromise(res))
  }

  // Добавить фильм в сохраненные
  addSavedMovie(movie) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country ? movie.country : noData,
        director: movie.director ? movie.director : noData,
        duration: movie.duration ? movie.duration : noData,
        year: movie.year ? movie.year : noData,
        description: movie.description ? movie.description : noData,
        image: movie.image ? baseUrlForImages + movie.image.url : noImagePic,
        trailerLink: movie.trailerLink ? movie.trailerLink : noVideoPic,
        thumbnail: movie.image.formats.thumbnail ? baseUrlForImages + movie.image.formats.thumbnail.url : noImagePic,
        nameRU: movie.nameRU ? movie.nameRU : noData,
        nameEN: movie.nameEN ? movie.nameEN : noData,
        id: movie.id
      })
    })
      .then(res => this._handlePromise(res))
  }

  // Удалить фильм из сохраненных
  deleteSavedMovie(movie) {
    return fetch(`${this.baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._handlePromise(res))
  }

  // Получить данные пользователя
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._handlePromise(res))
  }

  // Заменить данные пользователя
  editUserInfo({ name, email }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, email })
    })
      .then(res => this._handlePromise(res))
  }

  // Обработка запроса регистрации пользователя
  register(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => this._handlePromise(res))
      .then((res) => {
        return res;
      })
  };

  // Обработка запроса авторизации пользователя
  authorize (email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => this._handlePromise(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
  };

  // Обработка токена
  getToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => this._handlePromise(res))
    .then((data) => {
      return data
    })
  };
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
})