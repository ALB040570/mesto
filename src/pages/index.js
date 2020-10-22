//ПЕРЕМЕННЫЕ
//импортированные переменные
import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  parametrs,
  optionsForApi,
} from '../utils/constants.js';
//пописк DOM элементов
export const sector = document.querySelector('.profile');
const collectionPlace = document.querySelector('.elements'); //место куда вставляется карточка
const openPopupButtonEdit = sector.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = sector.querySelector('.profile__button-add');//кнопка запуска формы добавления фото
const openPopupEditAva = sector.querySelector('.profile__avatar');
const editForms = document.querySelector('#edit');//всплывающее окно с формой для редактирования
const popupConteinerForEdit = editForms.querySelector('.popup__form'); // форма для редактирования
const addForms = document.querySelector('#add');//всплывающее окно с формой для добавления фото
const popupConteinerForAdd = addForms.querySelector('.popup__form');//форма добавления фото
const editAvaForms = document.querySelector('#updata');
const popupConteinerForEditAva = editAvaForms.querySelector('.popup__form');//форма добавления фото
const profileName = sector.querySelector('.profile__name');
const profileInfo = sector.querySelector('.profile__profession');
const fieldSetEdit = popupConteinerForEdit.querySelector(parametrs.formFieldset);
const fieldSetAdd = popupConteinerForAdd.querySelector(parametrs.formFieldset);
const fieldSetEditAva = popupConteinerForEditAva.querySelector(parametrs.formFieldset);


//ИНСТАНЦИРОВАНИЕ
//инстанцирование (создание экземпляра) класса Api
const api = new Api(optionsForApi);

//инстанцирование (создание экземпляра) класса PopupWithImage
const viewer = new PopupWithImage('#view');
viewer.setEventListeners();

//инстанцирование (создание экземпляра) класса Card
function instantiationCard (photo) {
  const card = new Card({
    obj: photo,
    user:userInfo.getUserInfo(),
    userId: thisUserId,
    handleCardClick: (photo) =>{viewer.open(photo);},
    handleLikeClick: (card) => {api.putLike(card.cardId)},
    handleLikeSecondClick: (card) => {api.deleteLike(card.cardId)},
    handleDeleteIconClick: (card) => {
      confirmForm.setCardId(card);
      confirmForm.open();
    },
  },'#template_element');
  return card
}

//инстанцирование (создание экземпляра) класса PopupWithSubmit
const confirmForm = new PopupWithSubmit(formSubmitHandlerYes,'#yes');
confirmForm.setEventListeners();

//инстанцирование (создание экземпляра) класса UserInfo
const userInfo = new UserInfo(profileName,profileInfo,openPopupEditAva);

//инстанцирование (создание экземпляра) класса PopupWithForm
const editForm = new PopupWithForm(formSubmitHandler,'#edit');
editForm.setEventListeners();
const editAvaForm = new PopupWithForm(formSubmitHandlerEditAva, '#updata');
editAvaForm.setEventListeners();
const addForm = new PopupWithForm(formSubmitHandleradd, '#add');
addForm.setEventListeners();


//Загрузка информации о пользователе и карточек с сервера
let thisUserId = '';
let initialCards ={};
let cardList={};
const userInfoFromServer = api.getUsersInfo();
const cardsFromSer= api.getCards();
Promise.all([userInfoFromServer,cardsFromSer])
.then((res) => {
  console.log(res[0]);
  userInfo.setUserInfo(res[0]);
  thisUserId = res[0]._id;
  initialCards = res[1].map(item =>item)
  console.log(initialCards);
  return (thisUserId,initialCards.reverse());
})
.then (()=>{
  cardList = new Section({
    data:initialCards,
    renderer: (cardItem) => {
      const card = instantiationCard(cardItem);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  },
  collectionPlace);
  cardList.rendererItems();
})
.catch((err) => {console.log(err);});

//ФУНКЦИИ
//визуализация ожидания ответа сервера
function renderLoading(thisForm, isLoading) {
  const thisSubmit = thisForm.querySelector('.popup__button');
  if (isLoading) {
    thisSubmit.textContent = 'Сохранение...';
  } else {
    thisSubmit.textContent = 'Сохранить';
  }
}

//функция сохранения данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  renderLoading(editForms,true);
  editForm.getInputValues();
  const corectdData = {
    name: editForm._formValues.name,
    info: editForm._formValues.info
    }
  //загрузка на сервер и отображение измененной информации о пользователе
  const corectUserInfo = api.patchUsersInfo(corectdData);
  corectUserInfo.then((res)=>{
    userInfo.setUserInfo(res);
    editForm.close();})
  .catch((err) => {console.log(err);})
  .finally(()=>{renderLoading(editForms,false);});
}

//функция сохранения нового аватара
function formSubmitHandlerEditAva(evt) {
  evt.preventDefault();
  renderLoading(editAvaForms,true);
  editAvaForm.getInputValues();
  const newPhoto = {
    link: editAvaForm._formValues.link,
  }
  //загрузка на сервер и отображение измененного аватара
  const newAvatar = api.patchAvatar(newPhoto);
  newAvatar.then ((res)=>{
    userInfo.setUserInfo(res);
    editAvaForm.close();})
  .catch((err) => {console.log(err);})
  .finally(()=>{renderLoading(editAvaForms,false);});
};

//функция сохранения данных формы добавления фото
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  renderLoading(addForms,true);
  addForm.getInputValues();
  const newPhoto = {
    name: addForm._formValues.picture,
    link: addForm._formValues.link,
    likes: {},
    owner: {}
  };
  //Добавление новой карточки на сервер
  const newCard = api.postCard(newPhoto);
  newCard.then ((res)=>{
    const cardNew = instantiationCard(res);
    cardList.addItem(cardNew.createCard());
    addForm.close();})
  .catch((err) => {console.log(err);})
  .finally(()=>{renderLoading(addForms,false);});
}

//функция удаления фото через подтверждение
function formSubmitHandlerYes (evt) {
  evt.preventDefault();
  //Удаление карточки на серверe
  api.deleteCard(confirmForm.delCardId)
  .then (()=>{
    confirmForm.delCard.handleDeleteCard()
  });
  confirmForm.close();
}
  const editFormInputName = editForm.popup.querySelector('input[name="popup-name"]');
  const editFormInputInfo = editForm.popup.querySelector('input[name="popup-profession"]');

//СЛУШАТЕЛИ
//клик по кнопке открывает всплывающее окно редактирования
openPopupButtonEdit.addEventListener('click', ()=>{
  const info = userInfo.getUserInfo();
  editFormInputName.value=info.name;
  editFormInputInfo.value=info.info;
  editForm.open();
});

//клик по аватару открывает всплываающее окно редактирования аватара
openPopupEditAva.addEventListener('click',()=> {
  editAvaForm.open();
});

//клик по кнопке Добавить открывает всплывающее окно Добавления карточки
openPopupButtonAdd.addEventListener('click',()=> {
  addForm.open();
});


//установка валидаторов
const formList = Array.from(document.querySelectorAll(parametrs.formSelector));
formList.forEach((item) => {
  item.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
});


const validatorEditForm = new FormValidator(parametrs, fieldSetEdit, editForm);
validatorEditForm.enableValidation();

const validatorAddForm = new FormValidator(parametrs, fieldSetAdd, addForm);
validatorAddForm.enableValidation();

const validatorEditAvaForm = new FormValidator(parametrs, fieldSetEditAva, editAvaForm);
validatorEditAvaForm.enableValidation();
