import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(callBack, popupSelector) {
    super(popupSelector);
    this._callBack = callBack;
  }
  _getInputValues() {
    this._inputList = Array.from(this.popup.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.id] = input.value);
    return this._formValues;
  }

  close() {
    this._getInputValues();
    const form = this.popup.querySelector('.popup__form');
    form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    const popupConteinerForEdit = this.popup.querySelector('.popup__form');
    popupConteinerForEdit.addEventListener('submit', this._callBack);
  }
}
