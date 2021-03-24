class MoviesApi {
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

  // Получить список фильмов в виде массива
  getInitialMovies() {
    return fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._handlePromise(res))
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    "Content-Type": "application/json",
  }
})