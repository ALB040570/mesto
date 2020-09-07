const showInputError = (formElement, inputElement, errorMessage, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObj.errorClass);
};

const hideInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.classList.remove(formObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, formObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
};
const hasInvalidInput = function(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = function(inputList, buttonElement, formObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(formObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, formObj) => {
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formObj);
      toggleButtonState(inputList, buttonElement, formObj);
    });
  });
};

const enableValidation = (formObj) => {
  const formList = Array.from(document.querySelectorAll(formObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(formObj.formFieldset));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, formObj);
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formFieldset: '.popup__fieldset'
});
