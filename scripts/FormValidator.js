// класс FormValidator, который настраивает валидацию полей формы:
//принимает в конструктор объект настроек с селекторами и классами формы;
//принимает вторым параметром элемент той формы, которая валидируется;

export class FormValidator {
  constructor(parametrs, popup) {
    this.formSelector = parametrs.formSelector;
    this.inputSelector = parametrs.inputSelector;
    this.submitButtonSelector = parametrs.submitButtonSelector;
    this.inactiveButtonClass = parametrs.inactiveButtonClass;
    this.inputErrorClass = parametrs.inputErrorClass;
    this.errorClass = parametrs.errorClass;
    this.formFieldset = parametrs.formFieldset;
    this.popup = popup;

  }
//функция вставляет текст переданного сообщения об ошибке и включает выделение переданного input
 _showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this.errorClass);
};

//функция удаляет текст сообщения об ошибке и убирает выделение переданного input
_hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this.inputErrorClass);
  errorElement.classList.remove(this.errorClass);
  errorElement.textContent = '';
};

//функция вызывает функцию  showInputError(набор полей, input, сообщение об ошибке), если input не проходит валидацию,
//наче - вызывает функцию  hideInputError(набор полей, input)
 _checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(formElement, inputElement);
  }
};

// функция ищет невалидное значение один раз для каждого элемента массива переданных inputов,
// до тех пор, пока не найдет таковое. Если такой элемент найден вернёт true, иначе - false.
_hasInvalidInput = function(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция делает недоступной и другого стиля кнопку отправки данных, если результатом функции  hasInvalidInput(переданный  массив inputов) = true,
//иначе - делает кнопку доступной и возвращает ее активый стиль
_toggleButtonState = function(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
};

// функция вызывает функцию toggleButtonState(массив inputов, кнопка отправки данных) для кнопки отправки данных в переданном наборе полей
// и устанавливает слушатель каждого изменения данных в поле ввода для каждого input в наборе полей
// для каждого изменения в поле ввода данных вызываются две функции: checkInputValidity(набор полей, input)
//и toggleButtonState(массив inputов, кнопка отправки данных)
_setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  const buttonElement = formElement.querySelector(this.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      this._checkInputValidity(formElement, inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
};

//функция работает без слушателя изменения в inputах: проверяет все inputы переданного набора полей
// удаляет текст сообщения об ошибке и отключает кнопку отправки данных,
//если находит хотя бы одно невалидное input, иначе включает кнопку отправки данных
 validationForOpen = () => {
  const fieldSet = this.popup.querySelector(this.formFieldset);
  const inputList = Array.from(fieldSet.querySelectorAll(this.inputSelector));
  const buttonElement = fieldSet.querySelector(this.submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach((item) => {
      this._hideInputError(fieldSet, item);
      this._toggleButtonState(inputList, buttonElement);
    });
  };



// функция устанавливает слушатель отправки данных для каждой формы документа
// и для каждого набора полей каждой формы вызывает функцию setEventListeners(набор полей)
 enableValidation = () => {
  const fieldSet = this.popup.querySelector(this.formFieldset);
  fieldSet.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  this._setEventListeners(fieldSet);
};

};
