// класс Api
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _promise(requestData) {
    const promise = requestData.then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
    return promise;
  }

  getDataFromServer(subUrl) {
    const requestData = fetch(this._baseUrl+subUrl, {
      method: 'GET',
      headers: this._headers
    });
    return this._promise(requestData);
  }

  _checkOption(option,data) {
    if (option ==='avatar') {
      return {
      avatar: data.link
    };} else {
      if (option === 'info') {
        return {
          name: data.name,
          about: data.info
        };
      } else {
        return {
          name: data.name,
          link: data.link
        };
      }
    }
  }

  patchOrPostData(method, subUrl, option, data) {
    const dataOption = this._checkOption(option,data);
    const requestUserData = fetch(this._baseUrl+subUrl, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(dataOption)
    });
    return this._promise(requestUserData);
  }

  delOrPutData(method, subUrl, id) {
    const requestUserData = fetch(`${this._baseUrl}${subUrl}/${id}`, {
      method: method,
      headers: this._headers,
    });
    return this._promise(requestUserData);
  }

}
