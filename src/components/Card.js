
//класс Card, который создаёт карточку с текстом и ссылкой на изображение

export default class Card {
  // принимает в конструктор её данные и селектор её template-элемента
  constructor({
    obj,
    user,
    userId,
    handleCardClick,
    handleLikeClick,
    handleLikeSecondClick,
    handleDeleteIconClick},
    templateId) {
    this._name = obj.name;
    this._link = obj.link;
    this._like = obj.likes;
    this.cardId= obj._id;
    this._ownerId = obj.owner._id;
    this._user = user;
    this._userId =userId;
    this._template = document.querySelector(templateId).content;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeSecondClick = handleLikeSecondClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }
  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _getCardElement() {
    this._cardElement = this._template.querySelector('.element').cloneNode(true);//клонируем шаблон
    this._photo = this._cardElement.querySelector('.element__photo'); //именуем элемент карточки "фото"
    this._trashIcon = this._cardElement.querySelector('.element__trash');
    if(this._ownerId!==this._userId) {this._trashIcon.remove();};
    this._likeIcon = this._cardElement.querySelector('.element__like');
    if (this._hasLikeFromMe()) {this._likeIcon.classList.add("element__like_active");};
    this._likeCounter = this._cardElement.querySelector('.element__like-counter');
    this._likeCounter.textContent = this._like.length; //присваиваем колиичество лайков
    this._photo.src = this._link; //присваиваем источник фото
    this._photo.alt = `фото места ${this._name} "`;// приcваиваем alt фото
    this._cardElement.querySelector('.element__title').textContent = this._name; //присваиваем заголовку карточки подпись фото
    this._setListeners(this._trashIcon,this._likeIcon, this._photo);

    return this._cardElement;
  }

  _hasLikeFromMe() {
    return this._like.some((obj) => {
      return (obj._id === this._userId);
    });
  }

  _setListeners(trash,like, photo) {
    trash.addEventListener('click',() => {this._handleDeleteIconClick(this)});// клик по корзине удаляет карточку
    like.addEventListener('click', () => {this._handleLikeIcon(this)});// клик по сердцу ставит лайк
    photo.addEventListener('click', () => {this._handleCardClick(this)});
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _checkIsLike() {
    return (this._likeIcon.classList.contains("element__like_active"))? true: false;
  }

  _handleLikeIcon() {
    this._likeIcon.classList.toggle("element__like_active");
    if (this._checkIsLike()) {
      this._handleLikeClick(this)
      .then(()=>{
        this._like.push(this._user);
        this._likeCounter.textContent = this._like.length;
      })
      .catch((err) => {console.log(err);});
    } else {
      this._handleLikeSecondClick(this)
      .then(()=>{
        this._like.splice(this._like.indexOf(this._user),1);
        this._likeCounter.textContent = this._like.length;
      })
      .catch((err) => {console.log(err);});
    }
  }

  // содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  createCard() {
    return this._getCardElement(); //возвращает карточку
  }
}
