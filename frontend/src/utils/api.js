class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(response => this._getResponseData(response));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then(response => this._getResponseData(response));
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.title,
        link: cardData.link
      })
    })
      .then(response => this._getResponseData(response));
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(response => this._getResponseData(response));
  }

  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(response => this._getResponseData(response));
  }

  likeCardToggle(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => this._getResponseData(response));
    }
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => this._getResponseData(response));
  }

  // likeCard(id) {
  //   return fetch(`${this._baseUrl}/cards/likes/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       Authorization: this._token,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => this._getResponseData(response));
  // }

  // removeLikeCard(id) {
  //   return fetch(`${this._baseUrl}/cards/likes/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: this._token,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => this._getResponseData(response));
  // }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => this._getResponseData(response));
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.nikz.nomoredomains.rocks',
});

export default api;
