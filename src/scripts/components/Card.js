
//класс Card, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента
  constructor({obj,handleCardClick},templateId) {
    this._name = obj.name;
    this._link = obj.link;
    this._template = document.querySelector(templateId).content;
    this._handleCardClick = handleCardClick;
  }
  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _getCardElement() {
    this._cardElement = this._template.cloneNode(true);//клонируем шаблон
    // наполняем содержимым
    this._photo = this._cardElement.querySelector('.element__photo'); //именуем элемент карточки "фото"
    this._photo.src = this._link; //присваиваем источник фото
    this._photo.alt = `фото места ${this._name} "`;// приcваиваем alt фото
    this._cardElement.querySelector('.element__title').textContent = this._name; //присваиваем заголовку карточки подпись фото
    this._setListeners(this._cardElement, this._photo);
    return this._cardElement;
  }

  _setListeners(cardElement, photo) {
    cardElement.querySelector('.element__trash').addEventListener('click', this._handleDeleteCard);// клик по корзине удаляет карточку
    cardElement.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);// клик по сердцу ставит лайк
    photo.addEventListener('click', () => {this._handleCardClick(this)});

  }
  // содержит приватные методы для каждого обработчика
  _handleDeleteCard(evt) {evt.target.closest('.element').remove()};// удаляет картинку

  _handleLikeIcon(evt) {evt.target.classList.toggle("element__like_active")};//изменяет иконку лайка

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  createCard() {
    return this._getCardElement(); //возвращает карточку
  }
}
