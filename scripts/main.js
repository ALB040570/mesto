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
const elements = document.querySelector('.elements');
const Viewer = document.querySelector('#view');//окно просмотра фото;

initialCards.forEach(function(item) {

  // клонируем содержимое тега template
  const element = templateElement.cloneNode(true);

  // наполняем содержимым
  element.querySelector('.element__photo').src = item.link;
  element.querySelector('.element__photo').alt = 'фото места "' + item.name + '"';

  element.querySelector('.element__title').textContent = item.name;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    return evt.target.classList.toggle("element__like_active");
  }); //обработчик лайков
  element.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });// обработчик для корзины

  element.querySelector('.element__photo').addEventListener('click',function(evt) {
    Viewer.classList.toggle('popup_opened');
    Viewer.querySelector('.popup__image').src = evt.target.src;
    Viewer.querySelector('.popup__image').alt = evt.target.alt;
    Viewer.querySelector('.popup__caption').textContent = evt.target.alt.substr(11);

  });//обработчик фото

  // отображаем на странице
  elements.append(element);

});

// слушаем контейнер с карточками
elements.addEventListener('click', function (evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
});




