const sector = document.querySelector('.profile');
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

const optionsForApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '856155f9-12e9-47dc-bda9-cdcb166629fd',
    'Content-Type': 'application/json'
  }
}
const collectionPlace = document.querySelector('.elements'); //место куда вставляется карточка
const openPopupButtonEdit = document.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = document.querySelector('.profile__button-add');//кнопка запуска формы добавления фото
const openPopupEditAva = document.querySelector('.profile__avatar');
const editForms = document.querySelector('#edit');//всплывающее окно с формой для редактирования
const popupConteinerForEdit = editForms.querySelector('.popup__form'); // форма для редактирования
const addForms = document.querySelector('#add');//всплывающее окно с формой для добавления фото
const popupConteinerForAdd = addForms.querySelector('.popup__form');//форма добавления фото
const editAvaForms = document.querySelector('#updata');
const popupConteinerForEditAva = editAvaForms.querySelector('.popup__form');//форма добавления фото

const fieldSetEdit = popupConteinerForEdit.querySelector(parametrs.formFieldset);
const fieldSetAdd = popupConteinerForAdd.querySelector(parametrs.formFieldset);
const fieldSetEditAva = popupConteinerForEditAva.querySelector(parametrs.formFieldset);

export {
  sector,
  parametrs,
  optionsForApi,
  collectionPlace,
  openPopupButtonEdit,
  openPopupButtonAdd,
  openPopupEditAva,
  fieldSetEdit,
  fieldSetAdd,
  fieldSetEditAva
}
