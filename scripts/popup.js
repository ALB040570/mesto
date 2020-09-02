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
const popupConteinerForEdit = editForm.querySelector('.popup__conteiner');

// константы для добавления фото
const addForm = document.querySelector('#add');//форма
const closeButtonAddForm = addForm.querySelector('.popup__close');//кнопка закрытия
const inputValNamePhoto = addForm.querySelector('input[name="photo-name"]');//поле для ввода названия
const inputValLink = addForm.querySelector('input[name="photo-link"]');// поле для ввода ссылки
const popupConteinerForAdd = addForm .querySelector('.popup__conteiner');

//функция переключения класса
const popupToggle = (popup) =>{
 if (event.target!==event.currentTarget) {
  return;
}else {
  popup.classList.toggle('popup_opened');
}
}


//реакция на действия пользователя
openPopupButtonEdit.addEventListener('click', ()=>{
  inputValName.value = name.textContent;
  inputValProfession.value =profession.textContent;
  popupToggle(editForm);
});
openPopupButtonAdd.addEventListener('click',()=> popupToggle(addForm));
closeButtonEditForm.addEventListener('click', ()=> popupToggle(editForm));
closeButtonAddForm.addEventListener('click', ()=> popupToggle(addForm));
closeButtonViewer.addEventListener('click',()=> popupToggle(viewer));
editForm.addEventListener('click', ()=> popupToggle(editForm));//закрывается форма редактирования профиля без сохранения, если кликнуть вне формы
addForm.addEventListener('click', ()=> popupToggle(addForm));//закрывается форма добавления фото без сохранения, если кликнуть вне формы
viewer.addEventListener('click',()=> popupToggle(viewer));//закрывается окно просмотра фото, если кликнуть вне фото

// сохранение данных формы редактирования инфы о пользователе
function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = inputValName.value;
  profession.textContent = inputValProfession.value;
  popupToggle(editForm);
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
  popupToggle(addForm);
}
popupConteinerForAdd.addEventListener('submit', formSubmitHandleradd);

