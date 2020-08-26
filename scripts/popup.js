
const template_popup = document.querySelector('#template_popup').content;
const popup_window = document.querySelector("body");

// клонируем содержимое тега template для редактирования
const popup_edit = template_popup.cloneNode(true);

// наполняем содержимым для редактирования
popup_edit.querySelector('.popup').id = "edit";
popup_edit.querySelector('.popup__conteiner').name = "info";
popup_edit.querySelector('.popup__title').textContent = "Редактировать профиль";
popup_edit.querySelector('.popup__input').name = "popup-name";
popup_edit.querySelector('.popup__input_second').name = "popup-profession";

// отображаем на странице для редактирования
popup_window.append(popup_edit);

// клонируем содержимое тега template для добавления фото
const popup_add = template_popup.cloneNode(true);

// наполняем содержимым  для добавления фото
popup_add.querySelector('.popup').id = "add"
popup_add.querySelector('.popup__conteiner').name = "photo";
popup_add.querySelector('.popup__title').textContent = "Новое место";
popup_add.querySelector('.popup__input').name = "photo-name";
popup_add.querySelector('.popup__input_second').name = "photo-link";

// отображаем на странице  для добавления фото
popup_window.append(popup_add);

// переменные общие

const openPopupButton = document.querySelector('.profile__button-edit');
const openPopupButtonAdd = document.querySelector('.profile__button-add');


// переменные для редактирования
const pop_edit = document.querySelector('#edit');
const closePopupButton_edit = pop_edit.querySelector('.popup__close');
const inputValName = pop_edit.querySelector('input[name="popup-name"]');
const inputValProfession = pop_edit.querySelector('input[name="popup-profession"]');
const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');

// переменные для добавления фото
const pop_add = document.querySelector('#add');
const closePopupButton_add = pop_add.querySelector('.popup__close');
const inputValNamePhoto = pop_add.querySelector('input[name="photo-name"]');
const inputValLink = pop_add.querySelector('input[name="photo-link"]');


const pop_editToggle = function(event) {
  event.preventDefault();
  pop_edit.classList.toggle('popup_opened');
  inputVal();
}

const pop_addToggle = function(event) {
  event.preventDefault();
  pop_add.classList.toggle('popup_opened');
  inputVal();
}

const closePopup_edit = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    pop_editToggle(event);

  }
}
const closePopup_add = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    pop_addToggle(event);

  }
}
const inputVal = function() {

  inputValName.value = name.textContent;
  inputValProfession.value =profession.textContent;
  inputValNamePhoto.value = 'Название';
  inputValLink.value = "Ссылка на картинку";

}

openPopupButton.addEventListener('click', pop_editToggle);
openPopupButtonAdd.addEventListener('click',pop_addToggle);
closePopupButton_edit.addEventListener('click', pop_editToggle);
closePopupButton_add.addEventListener('click', pop_addToggle);
pop_edit.addEventListener('click', closePopup_edit);
pop_add.addEventListener('click', closePopup_add);

// сохранение редактииррования
const formElement = pop_edit.querySelector('.popup__conteiner');
function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = inputValName.value;
    profession.textContent = inputValProfession.value;
    pop_editToggle(evt);
}
formElement.addEventListener('submit', formSubmitHandler);


