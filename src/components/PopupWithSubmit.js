import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }

  setCardId(data) {
    this.delCardId = data.cardId;
    this.delCard = data;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._callback);
  }
}

