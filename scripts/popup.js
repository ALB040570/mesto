
const template_popup = document.querySelector('#template_popup').content;//содержимое форм
const template_view = document.querySelector('#template_view').content; //содержимое окна просмотра фото
const popup_window = document.querySelector("body");

//вставляем разметку окна просмотра фото
// клонируем содержимое тега template для окна
const popup_view = template_view.cloneNode(true);

// наполняем содержимым
popup_view.querySelector('.popup').id = "view";

// отображаем на странице разметку окна ппросмотра фото
popup_window.append(popup_view);



//вставляем разметку форм редактирования инфы о пользователе и добавлениия фото
// клонируем содержимое тега template для редактирования инфы о пользователе
const popup_edit = template_popup.cloneNode(true);

// наполняем содержимым для редактирования инфы о пользователе
popup_edit.querySelector('.popup').id = "edit";
popup_edit.querySelector('.popup__conteiner').name = "info";
popup_edit.querySelector('.popup__title').textContent = "Редактировать профиль";
popup_edit.querySelector('.popup__input').name = "popup-name";
popup_edit.querySelector('.popup__input_second').name = "popup-profession";

// отображаем на странице разметку для редактирования инфы о пользователе
popup_window.append(popup_edit);

// клонируем содержимое тега template для добавления фото
const popup_add = template_popup.cloneNode(true);

// наполняем содержимым  для добавления фото
popup_add.querySelector('.popup').id = "add"
popup_add.querySelector('.popup__conteiner').name = "photo";
popup_add.querySelector('.popup__title').textContent = "Новое место";
popup_add.querySelector('.popup__input').name = "photo-name";
popup_add.querySelector('.popup__input_second').name = "photo-link";

// отображаем на странице разметку для добавления фото
popup_window.append(popup_add);

// вводим константы

const openPopupButton = document.querySelector('.profile__button-edit');//кнопка запуска формы для редактирования
const openPopupButtonAdd = document.querySelector('.profile__button-add');//кнопка запуска формы добавления фото
const openPopupImg = document.querySelector('.element__photo');// картинка запуска окна просмотра

// константы для просмотра фото
const pop_view = document.querySelector('#view');//окно просмотра фото
const close_view = document.querySelector('.popup__close');//кнопка закрытия

// константы для редактирования инфы о пользователе
const pop_edit = document.querySelector('#edit');//форма
const closePopupButton_edit = pop_edit.querySelector('.popup__close');//кнопка закрытия
const inputValName = pop_edit.querySelector('input[name="popup-name"]');// поле для ввода имени
const inputValProfession = pop_edit.querySelector('input[name="popup-profession"]');//поле для ввода пррофессии
const name = document.querySelector('.profile__name');//имя из профиля
const profession = document.querySelector('.profile__profession');// профессия из профиля

// константы для добавления фото
const pop_add = document.querySelector('#add');//форма
const closePopupButton_add = pop_add.querySelector('.popup__close');//кнопка закрытия
const inputValNamePhoto = pop_add.querySelector('input[name="photo-name"]');//поле для ввода названия
const inputValLink = pop_add.querySelector('input[name="photo-link"]');// поле для ввода ссылки

//функция добавления/удаления класса для окна просмотра фото
const pop_viewToggle = function(event) {
  event.preventDefault();
  pop_view.classList.toggle('popup_opened');
}


//функция добавления/удаления класса и вызова функции для заполнения формы
//для редактирования инфы о пользователе
const pop_editToggle = function(event) {
  event.preventDefault();
  pop_edit.classList.toggle('popup_opened');

  inputVal();//выводит имя и профессию из профиля
}

//функция добавления/удаления класса и вызова функции для заполнения формы
//для добавления фото
const pop_addToggle = function(event) {
  event.preventDefault();
  pop_add.classList.toggle('popup_opened');
  inputVal();//здесь выводит подписи полей
}

//функция закрывает окно просмотра фото
const closePopup_view = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    pop_viewToggle(event);
  }
}

//функция закрывает форму для редактирования инфы о пользователе
const closePopup_edit = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    pop_editToggle(event);
  }
}

//функция закрывает форму для добавления фото
const closePopup_add = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    pop_addToggle(event);
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
openPopupButton.addEventListener('click', pop_editToggle);
openPopupButtonAdd.addEventListener('click',pop_addToggle);
closePopupButton_edit.addEventListener('click', pop_editToggle);
closePopupButton_add.addEventListener('click', pop_addToggle);
close_view.addEventListener('click',pop_viewToggle);
pop_edit.addEventListener('click', closePopup_edit);
pop_add.addEventListener('click', closePopup_add);
pop_view.addEventListener('click',closePopup_view);

// сохранение данных формы редактирования инфы о пользователе
const formElement_edit = pop_edit.querySelector('.popup__conteiner');
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = inputValName.value;
  profession.textContent = inputValProfession.value;
  pop_editToggle(evt);
}
formElement_edit.addEventListener('submit', formSubmitHandler);

//вставка фото
const formElement_add = pop_add.querySelector('.popup__conteiner');
function formSubmitHandleradd (evt) {
  evt.preventDefault();
  const template_element = document.querySelector('#template_element').content;
  const elements = document.querySelector('.elements');

  // клонируем содержимое тега template
  const element = template_element.cloneNode(true);

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
    pop_view.classList.toggle('popup_opened');
    pop_view.querySelector('.popup__image').src = evt.target.src;
    pop_view.querySelector('.popup__image').alt = evt.target.alt;
    pop_view.querySelector('.popup__caption').textContent = evt.target.alt.substr(11);

  });//обработчик фото

  // отображаем на странице
  elements.prepend(element);
  pop_addToggle(evt);
}
formElement_add.addEventListener('submit', formSubmitHandleradd);

// слушаем контейнер с карточками
elements.addEventListener('click', function (evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
});

