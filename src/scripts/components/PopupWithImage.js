import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._link = data._link;
    this._name = data._name;
  }
  open() {
    super.open();
    const picture = this.popup.querySelector('.popup__image');
    picture.src = this._link;
    picture.alt = this._name;
    this.popup.querySelector('.popup__caption').textContent = this._name;
  }
}
