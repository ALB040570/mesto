export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._form = this.popup.querySelector('.popup__form');
  }
  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keyup',this._handleEscClose.bind(this));
    document.addEventListener('mousedown',this._closeByOverlay.bind(this));
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
    document.removeEventListener('mousedown', this._closeByOverlay.bind(this));
  }

  _handleEscClose(evt) {
      if (evt.key === "Escape") {
        evt.preventDefault();
        this.close();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }
  
  setEventListeners() {
    const closeButton = this.popup.querySelector('.popup__close');
    closeButton.addEventListener('click', ()=> this.close());
  }
}
