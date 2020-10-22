export default class UserInfo {
  constructor(name,info,avatar) {
    this._name = name;
    this._info = info;
    this._avatar =avatar;
  }

  getUserInfo() {
    this._user = {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    };
    return this._user;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.about;
    this._avatar.src = data.avatar
  }

}
