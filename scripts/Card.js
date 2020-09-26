import {viewer, openPopup} from './index.js';

//класс Card, который создаёт карточку с текстом и ссылкой на изображение
export class Card {
  // принимает в конструктор её данные и селектор её template-элемента
  constructor(obj,templateId) {
    this.name = obj.name;
    this.link = obj.link;
    this.template = document.querySelector(templateId).content;
  }
  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _getCardElement(data) {
    const CardElement = this.template.cloneNode(true);//клонируем шаблон
    // наполняем содержимым
    const photo = CardElement.querySelector('.element__photo'); //именуем элемент карточки "фото"
    photo.src = data.link; //присваиваем источник фото
    photo.alt = `фото места ${data.name} "`;// приcваиваем alt фото
    CardElement.querySelector('.element__title').textContent = data.name; //присваиваем заголовку карточки подпись фото

    CardElement.querySelector('.element__trash').addEventListener('click', this._handleDeleteCard);// клик по корзине удаляет карточку
    CardElement.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);// клик по сердцу ставит лайк
    CardElement.querySelector('.element__photo').addEventListener('click', () => this._handlePreviewPicture(this));//  клик по фото открывает вьювер

    return CardElement;
  }
  // содержит приватные методы для каждого обработчика
  _handleDeleteCard = evt => {evt.target.closest('.element').remove()};// удаляет картинку

  _handleLikeIcon = evt => {evt.target.classList.toggle("element__like_active")};//изменяет иконку лайка

  _handlePreviewPicture = (data) => {
    openPopup(viewer);
    const picture = viewer.querySelector('.popup__image');
    picture.src = data.link;
    picture.alt = data.name;
    viewer.querySelector('.popup__caption').textContent = data.name;
  };//открывает вьюер

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  render(conteiner) {
    return conteiner.prepend(this._getCardElement(this)); //возвращает карточку
  }
}









