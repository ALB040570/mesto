const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//заполняем карточки с фото из массива
const templateElement = document.querySelector('#template_element').content;
const collectionPlace = document.querySelector('.elements');
const viewer = document.querySelector('#view');//окно просмотра фото;

const getCardElement = data => {
  // клонируем содержимое тега template
  const CardElement = templateElement.cloneNode(true);

  // наполняем содержимым
  const photo = CardElement.querySelector('.element__photo');
  photo.src = data.link;
  photo.alt = `фото места ${data.name} "`;
  CardElement.querySelector('.element__title').textContent = data.name;

  //устанавливает обработчики:
  CardElement.querySelector('.element__trash').addEventListener('click', handleDeleteCard);
  CardElement.querySelector('.element__like').addEventListener('click', handleLikeIcon);
  CardElement.querySelector('.element__photo').addEventListener('click', () => handlePreviewPicture (data));
  return CardElement;
};

const handleDeleteCard = evt => {evt.target.closest('.element').remove()};// удаляет картинку

const handleLikeIcon = evt => {evt.target.classList.toggle("element__like_active")};//изменяет иконку лайка

const handlePreviewPicture = (data) => {
  popupToggle(viewer);
  const picture = viewer.querySelector('.popup__image');
  picture.src = data.link;
  picture.alt = data.name;
  viewer.querySelector('.popup__caption').textContent = data.name;
};

const renderCard = index => {collectionPlace.prepend(getCardElement(index));};//использует функцию возвращения разметки карточки добавляя ее на страницу

initialCards.forEach(function(item) {
  renderCard(item);
});





