//ПЕРЕМЕННЫЕ
//импортированные переменные
import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';

import {initialCards} from '../scripts/data/data.js'
const parametrs = {
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
const openPopupButtonEdit = document.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = document.querySelector('.profile__button-add');//кнопка запуска формы добавления фото
const editForms = document.querySelector('#edit');//всплывающее окно с формой для редактирования
const popupConteinerForEdit = editForms.querySelector('.popup__form'); // форма для редактирования
const addForms = document.querySelector('#add');//всплывающее окно с формой для добавления фото
const popupConteinerForAdd = addForms.querySelector('.popup__form');//форма добавления фото

// инстанцирование (создание экземпляра) класса PopupWithImage
  const viewer = new PopupWithImage('#view');
  viewer.setEventListeners();

//инстанцирование (создание экземпляра) класса Card
function instantiationCard (photo) {
  const card = new Card({
    obj: photo,
    handleCardClick: (photo) =>{
      viewer.open(photo);
    }
  },'#template_element');
  return card
}

//первичная отрисовка карточек
const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = instantiationCard(cardItem);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    }
  },
  collectionPlace);
cardList.rendererItems();

const userInfo = new UserInfo('.profile__name','.profile__profession');

//всплывающее окно редактирования
const editForm = new PopupWithForm(formSubmitHandler,'#edit');
editForm.setEventListeners();

//клик по кнопке открывает всплывающее окно редактирования
openPopupButtonEdit.addEventListener('click', ()=>{
  const info = userInfo.getUserInfo();
  editForm.popup.querySelector('input[name="popup-name"]').value=info.name;
  editForm.popup.querySelector('input[name="popup-profession"]').value=info.info;
  editForm.open();
});

//функция сохранение данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  editForm.close();
  const data = {
    name: editForm._formValues.name,
    info: editForm._formValues.info
    }
  userInfo.setUserInfo(data);
}

//всплывающее окно добавления фото
const addForm = new PopupWithForm(formSubmitHandleradd, '#add');
addForm.setEventListeners();

//клик по кнопке Добавить открывает всплывающее окно Добавления карточки
openPopupButtonAdd.addEventListener('click',()=> {
  addForm.open();
});

//функция сохранения данных формы добавления фото
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  addForm.close();
  const newPhoto = {
    name: addForm._formValues.picture,
    link: addForm._formValues.link
  };
  const cardNew = instantiationCard(newPhoto);
  collectionPlace.prepend(cardNew.createCard());
}

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
