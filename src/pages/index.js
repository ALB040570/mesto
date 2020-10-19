//ПЕРЕМЕННЫЕ
//импортированные переменные
import '../pages/index.css';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
  parametrs,
  optionsForApi,
  collectionPlace,
  openPopupButtonEdit,
  openPopupButtonAdd,
  openPopupEditAva,
  fieldSetEdit,
  fieldSetAdd,
  fieldSetEditAva
} from '../scripts/constants/constants.js'

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
    handleCardClick: (photo) =>{
      viewer.open(photo);
    },
    handleLikeClick: (card) => {
     // ...что должно произойти при клике на лайк
      const liker = {
        name: document.querySelector('.profile__name').textContent,
        about: document.querySelector('.profile__profession').textContent,
        avatar: document.querySelector('.profile__avatar').src
      };
      const likeApi = !card.checkIsLike()? api.delOrPutData('PUT','/cards/likes',card.cardId): api.delOrPutData('DELETE','/cards/likes',card.cardId);
      card.handleLikeIcon(likeApi,liker);
    },
    handleDeleteIconClick: (card) => {
     // ...что должно произойти при клике на удаление

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
const userInfo = new UserInfo('.profile__name','.profile__profession');

//инстанцирование (создание экземпляра) класса PopupWithForm
const editForm = new PopupWithForm(formSubmitHandler,'#edit');
editForm.setEventListeners();
const editAvaForm = new PopupWithForm(formSubmitHandlerEditAva, '#updata');
editAvaForm.setEventListeners();
const addForm = new PopupWithForm(formSubmitHandleradd, '#add');
addForm.setEventListeners();



//Загрузка информации о пользователе с сервера
let userId = '';
const userInfoFromServer = api.getDataFromServer('/users/me');
userInfoFromServer.then((user) => {
  console.log(user);
  document.querySelector('.profile__name').textContent = user.name;
  document.querySelector('.profile__profession').textContent=user.about;
  document.querySelector('.profile__avatar').src = user.avatar;
  userId = user._id;
  return userId;
})
.catch((err) => {console.log(err);});
export {userId};

//Загрузка карточек с сервера в секцию
const cards = api.getDataFromServer('/cards');
cards.then((result) => {
  var initialCards = result.map(item =>item);
  console.log(initialCards);
  return initialCards.reverse();
})
.then ((initialCards) => {
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
})
.catch((err) => {console.log(err);});

//ФУНКЦИИ
//визуализация ожидания ответа сервера
function renderLoading(isLoading) {
  if (isLoading) {
    document.querySelector('.popup__button').textContent = 'Сохранение...';
  } else {
    document.querySelector('.popup__button').textContent = 'Сохранить';
  }
}

//функция сохранения данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  renderLoading(true);
  editForm.close();
  const corectdData = {
    name: editForm._formValues.name,
    info: editForm._formValues.info
    }
  //загрузка на сервер и отображение измененной информации о пользователе
  const corectUserInfo = api.patchOrPostData('PATCH', '/users/me', 'info', corectdData);
  corectUserInfo.then((res)=>{
    userInfo.setUserInfo(res);})
  .catch((err) => {console.log(err);})
  .finally(()=>{renderLoading(false);});
}

//функция сохранения нового аватара
function formSubmitHandlerEditAva(evt) {
  evt.preventDefault();
  renderLoading(true);
  editAvaForm.close();
  const newPhoto = {
    link: editAvaForm._formValues.link,
  }
  //загрузка на сервер и отображение измененного аватара
  const newAvatar = api.patchOrPostData('PATCH', '/users/me/avatar', 'avatar', newPhoto);
  newAvatar.then ((res)=>{openPopupEditAva.src = res.avatar;})
  .catch((err) => {console.log(err);})
  .finally(()=>{renderLoading(false);});
};

//функция сохранения данных формы добавления фото
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  addForm.close();
  const newPhoto = {
    name: addForm._formValues.picture,
    link: addForm._formValues.link,
    likes: {},
    owner: {}
  };
  //Добавление новой карточки на сервер
  const newCard = api.patchOrPostData('POST','/cards', 'photo', newPhoto);
  newCard.then ((res)=>{
    const cardNew = instantiationCard(res);
    collectionPlace.prepend(cardNew.createCard());
  })
  .catch((err) => {console.log(err);})
  .finally(()=>{renderLoading(false);});
}

//функция удаления фото
function formSubmitHandlerYes (evt) {
  evt.preventDefault();
  confirmForm.close();
  //Удаление карточки на серверe
  const delCardApi = api.delOrPutData('DELETE','/cards',confirmForm.delCardId);
  confirmForm.delCard.handleDeleteCard(delCardApi);

}

//СЛУШАТЕЛИ
//клик по кнопке открывает всплывающее окно редактирования
openPopupButtonEdit.addEventListener('click', ()=>{
  const info = userInfo.getUserInfo();
  editForm.popup.querySelector('input[name="popup-name"]').value=info.name;
  editForm.popup.querySelector('input[name="popup-profession"]').value=info.info;
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
