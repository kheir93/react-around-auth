class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  //Api ATHENTICATION//

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me/', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        name,
        about
      )
    })
      .then(this._checkResponse)
  }

  setUserAvatar({avatar}) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  newCard({ title, link }) {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
      .then(this._checkResponse)
  }

  removeCard({ cardId }) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  removeLike(cardId) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}

const api = new Api({
    baseUrl: 'https://around.nomoreparties.co/v1/group-13',
    headers: {
      authorization: "4b9bb316-6c12-461f-86a3-76e6af7325ba",
      "Content-Type": "application/json"
    }
  });

  export default api
