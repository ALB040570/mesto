const parametrs = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formFieldset: '.popup__fieldset'
};

//функция вставляет текст переданного сообщения об ошибке и включает выделение переданного input
const showInputError = (formElement, inputElement, errorMessage, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObj.errorClass);
};

//функция удаляет текст сообщения об ошибке и убирает выделение переданного input
const hideInputError = (formElement, inputElement, formObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObj.inputErrorClass);
  errorElement.classList.remove(formObj.errorClass);
  errorElement.textContent = '';
};

//функция вызывает функцию  showInputError(набор полей, input, сообщение об ошибке), если input не проходит валидацию,
//наче - вызывает функцию  hideInputError(набор полей, input)
const checkInputValidity = (formElement, inputElement, formObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObj);
  } else {
    hideInputError(formElement, inputElement, formObj);
  }
};

// функция ищет невалидное значение один раз для каждого элемента массива переданных inputов,
// до тех пор, пока не найдет таковое. Если такой элемент найден вернёт true, иначе - false.
const hasInvalidInput = function(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция делает недоступной и другого стиля кнопку отправки данных, если результатом функции  hasInvalidInput(переданный  массив inputов) = true,
//иначе - делает кнопку доступной и возвращает ее активый стиль
const toggleButtonState = function(inputList, buttonElement, formObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(formObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
};

// функция вызывает функцию toggleButtonState(массив inputов, кнопка отправки данных) для кнопки отправки данных в переданном наборе полей
// и устанавливает слушатель каждого изменения данных в поле ввода для каждого input в наборе полей
// для каждого изменения в поле ввода данных вызываются две функции: checkInputValidity(набор полей, input)
//и toggleButtonState(массив inputов, кнопка отправки данных)
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

//функциия работает без слушателя изменения в inputах: проверяет все inputы переданного набора полей
// удаляет текст сообщения об ошибке и отключает кнопку отправки данных,
//если находит хотя бы одно невалидное input, иначе включает кнопку отправки данных
const validationForOpen = (formElement, formObj) => {
  const inputList = Array.from(formElement.querySelectorAll(formObj.inputSelector));
  const buttonElement = formElement.querySelector(formObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formObj);
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, formObj);
      toggleButtonState(inputList, buttonElement, formObj);
    });
  };



// функция устанавливает слушатель отправки данных для каждой формы документа
// и для каждого набора полей каждой формы вызывает функцию setEventListeners(набор полей)
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

// вызов функции enableValidation(объект с нужными параметрами) для валидации форм, в которых что-то вводится
enableValidation(parametrs);

