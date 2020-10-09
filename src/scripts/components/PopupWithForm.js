import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(callBack, popupSelector) {
    super(popupSelector);
    this._callBack = callBack;
    this.data = {[0]:'',[1]:''}

  }
  _getInputValues() {
    const inputList = Array.from(this.popup.querySelectorAll('.popup__input'));
    let i = 0;
    inputList.forEach((item) => {
      this.data[i]=item.value;
      i += 1;
      });
    return this.data;
  }

  close() {
    this._getInputValues();
    const form = this.popup.querySelector('.popup__form');
    form.reset();
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keyup',this._handleEscClose.bind(this));
    document.removeEventListener('mousedown',this._closeByOverlay.bind(this));
  }

  _setEventListeners() {
    const closeButton = this.popup.querySelector('.popup__close');
    closeButton.addEventListener('click', ()=> this.close());
    const popupConteinerForEdit = this.popup.querySelector('.popup__form');
    popupConteinerForEdit.addEventListener('submit', this._callBack);
  }
}
