class Api {
  constructor({ baseUrl, token, cohort }) {
    this._baseUrl = baseUrl;
    this._token = token;
    this._cohort = cohort;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(response => this._getResponseData(response));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(response => this._getResponseData(response));
  }

  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
    return fetch(`${this._baseUrl}/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
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
      return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => this._getResponseData(response));
    }
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => this._getResponseData(response));
  }

  // likeCard(id) {
  //   return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => this._getResponseData(response));
  // }

  // removeLikeCard(id) {
  //   return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/likes/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => this._getResponseData(response));
  // }

  removeCard(id) {
    return fetch(`${this._baseUrl}/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => this._getResponseData(response));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  token: 'cc9b5eea-6347-43e1-8bc0-e5144b330bd4',
  cohort: 'cohort-25'
});

export default api;
