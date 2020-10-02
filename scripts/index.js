//ПЕРЕМЕННЫЕ
//импортированные переменные
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//собственные переменные
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

export const parametrs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formFieldset: '.popup__fieldset',
  openButtonSelector:'button',
};

const collectionPlace = document.querySelector('.elements'); //место куда вставляется карточка
export const viewer = document.querySelector('#view');//окно просмотра фото
export const picture = viewer.querySelector('.popup__image');
const closeButtonViewer = viewer.querySelector('.popup__close');//кнопка закрытия окна просмотра фото
const openPopupButtonEdit = document.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = document.querySelector('.profile__button-add');//кнопка запуска формы добавления фото

// константы для редактирования инфы о пользователе
const editForm = document.querySelector('#edit');//всплывающее окно с формой для редактирования
const closeButtonEditForm = editForm.querySelector('.popup__close');//кнопка закрытия
const inputValName = editForm.querySelector('input[name="popup-name"]');// поле для ввода имени
const inputValProfession = editForm.querySelector('input[name="popup-profession"]');//поле для ввода пррофессии
const name = document.querySelector('.profile__name');//имя из профиля
const profession = document.querySelector('.profile__profession');// профессия из профиля
const popupConteinerForEdit = editForm.querySelector('.popup__form'); // форма для редактирования

// константы для добавления фото
const addForm = document.querySelector('#add');//всплывающее окно с формой для добавления фото
const closeButtonAddForm = addForm.querySelector('.popup__close');//кнопка закрытия
const inputValNamePhoto = addForm.querySelector('input[name="photo-name"]');//поле для ввода названия
const inputValLink = addForm.querySelector('input[name="photo-link"]');// поле для ввода ссылки
const popupConteinerForAdd = addForm .querySelector('.popup__form');//форма добавления фото
const photo = document.getElementById('photo');



//ФУНЦИИ
// отрисовываются карточки с фото
//для каждого объекта из массива initialCards создается объекткласса Card и выполняется метод render
initialCards.forEach(function(item) {
  const card = new Card(item,'#template_element');
  collectionPlace.prepend(card.createCard());
});

//функция открытия всплывающего окна
  export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup',closeByEsc);
  document.addEventListener('mousedown',closeByOverlay);
}

//функция закрытия всплывающего окна
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup',closeByEsc);
  document.removeEventListener('mousedown',closeByOverlay);
}

//функция закрытия всплывающего окна по Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//функция закрытия всплывающего окна по overlay
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//функция сохранение данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = inputValName.value;
  profession.textContent = inputValProfession.value;
  closePopup(editForm);
}

//функция сохранения данных формы добавления фото
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  const newPhoto = {
    name: inputValNamePhoto.value,
    link: inputValLink.value,
  };
  const cardNew = new Card(newPhoto,'#template_element');
  collectionPlace.prepend(cardNew.createCard());
  photo.reset();
  closePopup(addForm);
}

//РЕАКЦИИ НА ДЕЙСТВИЯ ПОЛЬЗОВАТЕЛЯ
//открытия всплывающих окон
//клик на кнопку редактирования открывает всплывающее окно редактирования
openPopupButtonEdit.addEventListener('click', ()=>{
  inputValName.value = name.textContent;
  inputValProfession.value =profession.textContent;
  openPopup(editForm);
});

//клик по кнопке Добавить открывает всплывающее окно Добавления карточки
openPopupButtonAdd.addEventListener('click',()=> {
  openPopup(addForm);
  inputValNamePhoto.value = '';
  inputValLink.value='';
});

// закрытия всплывающих окон
closeButtonEditForm.addEventListener('click', ()=> closePopup(editForm));//клик по крестику закроет всплываающее окно редактирования
closeButtonAddForm.addEventListener('click', ()=> closePopup(addForm));//клик по крестику закроет всплываающее окно добавления карточки
closeButtonViewer.addEventListener('click',()=> closePopup(viewer));//клик по крестику закроет всплываающее окно просмотра фото

//отправка данных
popupConteinerForEdit.addEventListener('submit', formSubmitHandler);//отправка данных формы редактирования
popupConteinerForAdd.addEventListener('submit', formSubmitHandleradd);//вставка фото

//установка валидаторов
const formList = Array.from(document.querySelectorAll(parametrs.formSelector));
formList.forEach((item) => {
  item.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
});
const fieldSetEdit = popupConteinerForEdit.querySelector(parametrs.formFieldset);
const validatorEditForm = new FormValidator(parametrs, fieldSetEdit, editForm);
validatorEditForm.enableValidation();
const fieldSetAdd = popupConteinerForAdd.querySelector(parametrs.formFieldset);
const validatorAddForm = new FormValidator(parametrs, fieldSetAdd, addForm);
validatorAddForm.enableValidation();
