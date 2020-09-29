import {viewer, picture, openPopup} from './index.js';

//класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  // принимает в конструктор её данные и селектор её template-элемента
  constructor(obj,templateId) {
    this._name = obj.name;
    this._link = obj.link;
    this._template = document.querySelector(templateId).content;
  }
  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _getCardElement(data) {
    const cardElement = this._template.cloneNode(true);//клонируем шаблон
    // наполняем содержимым
    const photo = cardElement.querySelector('.element__photo'); //именуем элемент карточки "фото"
    photo.src = data._link; //присваиваем источник фото
    photo.alt = `фото места ${data._name} "`;// приcваиваем alt фото
    cardElement.querySelector('.element__title').textContent = data._name; //присваиваем заголовку карточки подпись фото

    cardElement.querySelector('.element__trash').addEventListener('click', this._handleDeleteCard);// клик по корзине удаляет карточку
    cardElement.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);// клик по сердцу ставит лайк
    photo.addEventListener('click', () => this._handlePreviewPicture(this));//  клик по фото открывает вьювер

    return cardElement;
  }
  // содержит приватные методы для каждого обработчика
  _handleDeleteCard = evt => {evt.target.closest('.element').remove()};// удаляет картинку

  _handleLikeIcon = evt => {evt.target.classList.toggle("element__like_active")};//изменяет иконку лайка

  _handlePreviewPicture = () => {
    openPopup(viewer);
    picture.src = this._link;
    picture.alt = this._name;
    viewer.querySelector('.popup__caption').textContent = this._name;
  };//открывает вьюер

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  createCard() {
    return this._getCardElement(this); //возвращает карточку
  }

}
