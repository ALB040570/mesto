
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
    this._photo = this._cardElement.querySelector('.element__photo'); //именуем элемент карточки "фото"
    this._trashIcon = this._cardElement.querySelector('.element__trash');
    this._likeIcon = this._cardElement.querySelector('.element__like');
    this._photo.src = this._link; //присваиваем источник фото
    this._photo.alt = `фото места ${this._name} "`;// приcваиваем alt фото
    this._cardElement.querySelector('.element__title').textContent = this._name; //присваиваем заголовку карточки подпись фото
    this._setListeners(this._trashIcon,this._likeIcon, this._photo);
    return this._cardElement;
  }

  _setListeners(trash,like, photo) {
    trash.addEventListener('click', ()=>{trash.closest('.element').remove()});// клик по корзине удаляет карточку
    like.addEventListener('click', () => {like.classList.toggle("element__like_active")});// клик по сердцу ставит лайк
    photo.addEventListener('click', () => {this._handleCardClick(this)});
  }

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  createCard() {
    return this._getCardElement(); //возвращает карточку
  }
}
