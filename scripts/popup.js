// вводим константы
const openPopupButtonEdit = document.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = document.querySelector('.profile__button-add');//кнопка запуска формы добавления фото

// константы для просмотра фото
const closeButtonViewer = Viewer.querySelector('.popup__close');//кнопка закрытия

// константы для редактирования инфы о пользователе
const editForm = document.querySelector('#edit');//форма
const closeButtonEditForm = editForm.querySelector('.popup__close');//кнопка закрытия
const inputValName = editForm.querySelector('input[name="popup-name"]');// поле для ввода имени
const inputValProfession = editForm.querySelector('input[name="popup-profession"]');//поле для ввода пррофессии
const name = document.querySelector('.profile__name');//имя из профиля
const profession = document.querySelector('.profile__profession');// профессия из профиля

// константы для добавления фото
const addForm = document.querySelector('#add');//форма
const closeButtonAddForm = addForm.querySelector('.popup__close');//кнопка закрытия
const inputValNamePhoto = addForm.querySelector('input[name="photo-name"]');//поле для ввода названия
const inputValLink = addForm.querySelector('input[name="photo-link"]');// поле для ввода ссылки

//функция добавления/удаления класса для окна просмотра фото
const popupViewerToggle = function(event) {
  event.preventDefault();
  Viewer.classList.toggle('popup_opened');
}

//функция добавления/удаления класса и вызова функции для заполнения формы
//для редактирования инфы о пользователе
const popupEditFormToggle = function(event) {
  event.preventDefault();
  editForm.classList.toggle('popup_opened');
  inputVal();//выводит имя и профессию из профиля
}

//функция добавления/удаления класса и вызова функции для заполнения формы
//для добавления фото
const popupAddFormToggle = function(event) {
  event.preventDefault();
  addForm.classList.toggle('popup_opened');
  inputVal();//здесь выводит подписи полей
}

//функция закрывает окно просмотра фото
const closeViewer = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    popupViewerToggle(event);
  }
}

//функция закрывает форму для редактирования инфы о пользователе
const closeEditForm = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    popupEditFormToggle(event);
  }
}

//функция закрывает форму для добавления фото
const closeAddForm = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    popupAddFormToggle(event);
  }
}

// функция заполнения полей ввода обеих форм и окна просмотра
const inputVal = function() {
  inputValName.value = name.textContent;
  inputValProfession.value =profession.textContent;
  inputValNamePhoto.value = 'Название';
  inputValLink.value = "Ссылка на картинку";
}

//реакция на действия пользователя
openPopupButtonEdit.addEventListener('click', popupEditFormToggle);
openPopupButtonAdd.addEventListener('click',popupAddFormToggle);
closeButtonEditForm.addEventListener('click', popupEditFormToggle);
closeButtonAddForm.addEventListener('click', popupAddFormToggle);
closeButtonViewer.addEventListener('click',popupViewerToggle);
editForm.addEventListener('click', closeEditForm);
addForm.addEventListener('click', closeAddForm);
Viewer.addEventListener('click',closeViewer);

// сохранение данных формы редактирования инфы о пользователе
const editFormElement = editForm.querySelector('.popup__conteiner');
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = inputValName.value;
  profession.textContent = inputValProfession.value;
  popupEditFormToggle(evt);
}
editFormElement.addEventListener('submit', formSubmitHandler);

//вставка фото
const addFormElement = addForm.querySelector('.popup__conteiner');
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  const templateElement = document.querySelector('#template_element').content;
  const elements = document.querySelector('.elements');

  // клонируем содержимое тега template
  const element = templateElement.cloneNode(true);

  // наполняем содержимым
  element.querySelector('.element__photo').src = inputValLink.value;
  element.querySelector('.element__photo').alt = 'фото места "' + inputValNamePhoto.value + '"';
  element.querySelector('.element__title').textContent = inputValNamePhoto.value;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    return evt.target.classList.toggle("element__like_active");
  }); // обработчик для лайков
  element.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  }); //обработчик для корзины

  element.querySelector('.element__photo').addEventListener('click',function(evt) {
    Viewer.classList.toggle('popup_opened');
    Viewer.querySelector('.popup__image').src = evt.target.src;
    Viewer.querySelector('.popup__image').alt = evt.target.alt;
    Viewer.querySelector('.popup__caption').textContent = evt.target.alt.substr(11);

  });//обработчик фото

  // отображаем на странице
  elements.prepend(element);
  popupAddFormToggle(evt);
}
addFormElement.addEventListener('submit', formSubmitHandleradd);

// слушаем контейнер с карточками
elements.addEventListener('click', function (evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
});

