// вводим константы
const openPopupButtonEdit = document.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = document.querySelector('.profile__button-add');//кнопка запуска формы добавления фото

// константы для просмотра фото
const closeButtonViewer = viewer.querySelector('.popup__close');//кнопка закрытия

// константы для редактирования инфы о пользователе
const editForm = document.querySelector('#edit');//форма
const closeButtonEditForm = editForm.querySelector('.popup__close');//кнопка закрытия
const inputValName = editForm.querySelector('input[name="popup-name"]');// поле для ввода имени
const inputValProfession = editForm.querySelector('input[name="popup-profession"]');//поле для ввода пррофессии
const name = document.querySelector('.profile__name');//имя из профиля
const profession = document.querySelector('.profile__profession');// профессия из профиля
const popupConteinerForEdit = editForm.querySelector('.popup__form');

// константы для добавления фото
const addForm = document.querySelector('#add');//форма
const closeButtonAddForm = addForm.querySelector('.popup__close');//кнопка закрытия
const inputValNamePhoto = addForm.querySelector('input[name="photo-name"]');//поле для ввода названия
const inputValLink = addForm.querySelector('input[name="photo-link"]');// поле для ввода ссылки
const popupConteinerForAdd = addForm .querySelector('.popup__form');

//функция открытия окна
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup',closeByEsc);
  document.addEventListener('mousedown',closeByOverlay);
}
//функция закрытия окна
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup',closeByEsc);
  document.removeEventListener('mousedown',closeByOverlay);
}

//функция закрытия окна по Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//функция закрытия окна по overlay
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//реакция на действия пользователя
openPopupButtonEdit.addEventListener('click', ()=>{
  inputValName.value = name.textContent;
  inputValProfession.value =profession.textContent;
  openPopup(editForm);
});

openPopupButtonAdd.addEventListener('click',()=> openPopup(addForm));
closeButtonEditForm.addEventListener('click', ()=> closePopup(editForm));
closeButtonAddForm.addEventListener('click', ()=> closePopup(addForm));
closeButtonViewer.addEventListener('click',()=> closePopup(viewer));


// сохранение данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = inputValName.value;
  profession.textContent = inputValProfession.value;
  closePopup(editForm);
}
popupConteinerForEdit.addEventListener('submit', formSubmitHandler);

//вставка фото
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  const newPhoto = {
    name: inputValNamePhoto.value,
    link: inputValLink.value,
  };

  renderCard(newPhoto);
  document.getElementById('photo').reset();
  closePopup(addForm);
}
popupConteinerForAdd.addEventListener('submit', formSubmitHandleradd);

