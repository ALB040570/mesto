const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__button-edit');
const closePopupButton = popup.querySelector('.popup__close');
const inputValName = popup.querySelector('.popup__name');
const inputValProfession = popup.querySelector('.popup__profession');
const name = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const popupToggle = function(event) {
  event.preventDefault();
  popup.classList.toggle('popup_opened');
  inputVal();
}
const closePopup = function(event) {
  if (event.target!==event.currentTarget) {
    return;
  }else {
    popupToggle(event);
  }
}
const inputVal = function() {
  inputValName.value = name.textContent;
  inputValProfession.value =profession.textContent;
}

openPopupButton.addEventListener('click', popupToggle);
closePopupButton.addEventListener('click', popupToggle);
popup.addEventListener('click', closePopup);

const formElement = popup.querySelector('.popup__save');
function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = inputValName.value;
    profession.textContent = inputValProfession.value;
    popupToggle(evt);
}
formElement.addEventListener('click', formSubmitHandler);


