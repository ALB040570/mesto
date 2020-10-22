import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  open(data) {
    super.open();
    const picture = this.popup.querySelector('.popup__image');
    picture.src = data._link;
    picture.alt = data._name;
    this.popup.querySelector('.popup__caption').textContent = data._name;
  }
}
