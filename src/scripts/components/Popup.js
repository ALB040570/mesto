export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }
  open = () => {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keyup',this._handleEscClose);
    document.addEventListener('mousedown',(evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.popup.classList.remove('popup_opened')};
    });
    this._setEventListeners();
  }

  close = () => {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keyup',this._handleEscClose);
    document.removeEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.popup.classList.remove('popup_opened')};
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners =() => {
    const closeButton = this.popup.querySelector('.popup__close');
    closeButton.addEventListener('click', ()=> this.close());
  }
}
