//ПЕРЕМЕННЫЕ
//импортированные переменные
import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';

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


//первичная отрисовка карточек
const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card({
      obj: cardItem,
      handleCardClick: (cardItem) =>{
        const viewer = new PopupWithImage(cardItem,'#view');
        viewer.open();
      }
    },'#template_element');
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    }
  },
  collectionPlace);
cardList.rendererItems();

// информация о пользователе
const userInfo = new UserInfo('.profile__name','.profile__profession');
const info = userInfo.getUserInfo();

//всплывающее окно редактирования
const editForm = new PopupWithForm(formSubmitHandler,'#edit');

//клик по кнопке открывает всплывающее окно редактирования
openPopupButtonEdit.addEventListener('click', ()=>{
  editForm.popup.querySelector('input[name="popup-name"]').value=info.name;
  editForm.popup.querySelector('input[name="popup-profession"]').value=info.info;
  editForm.open();
});

//функция сохранение данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  editForm.close();
  const data = {
    name: editForm.data[0],
    info: editForm.data[1]
    }
  userInfo.setUserInfo(data);
}

//всплывающее окно добавления фото
const addForm = new PopupWithForm(formSubmitHandleradd, '#add');

//клик по кнопке Добавить открывает всплывающее окно Добавления карточки
openPopupButtonAdd.addEventListener('click',()=> {
  addForm.open();
});

//функция сохранения данных формы добавления фото
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  addForm.close();
  const newPhoto = {
    name: addForm.data[0],
    link: addForm.data[1],
  };
  const cardNew = new Card({
    obj: newPhoto,
    handleCardClick: (newPhoto) =>{
      const viewer = new PopupWithImage(newPhoto,'#view');
      viewer.open();
    }
  },'#template_element');
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
