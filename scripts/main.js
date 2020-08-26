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

const template_element = document.querySelector('#template_element').content;
const elements = document.querySelector('.elements');

initialCards.forEach(function(item) {

// клонируем содержимое тега template
const element = template_element.cloneNode(true);

// наполняем содержимым
element.querySelector('.element__photo').src = item.link;
element.querySelector('.element__photo').alt = 'фото места "' + item.name + '"';
element.querySelector('.element__title').textContent = item.name;

// отображаем на странице
elements.append(element);
});

