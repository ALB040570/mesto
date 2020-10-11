import {sector} from '../constants/constants.js';
// класс FormValidator, который настраивает валидацию полей формы:
//принимает в конструктор объект настроек с селекторами и классами формы
//принимает вторым параметром элемент той формы, которая валидируется

export default class FormValidator {
  constructor(parametrs, fieldSet, popup) {
    this._fieldSet = fieldSet;
    this._formSelector = parametrs.formSelector;
    this._inputSelector = parametrs.inputSelector;
    this._submitButtonSelector = parametrs.submitButtonSelector;
    this._inactiveButtonClass = parametrs.inactiveButtonClass;
    this._inputErrorClass = parametrs.inputErrorClass;
    this._errorClass = parametrs.errorClass;
    this._formFieldset = parametrs.formFieldset;
    this.openButtonSelector=parametrs.openButtonSelector;
  }

//имеет один публичный метод enableValidation, который включает валидацию формы
  enableValidation() {
    const inputList = Array.from(this._fieldSet.querySelectorAll(this._inputSelector));
    const buttonElement = this._fieldSet.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((item) => {
      this._hideInputError(this._fieldSet, item);
      this._toggleButtonState(inputList, buttonElement);
      });
    this._setEventListeners(inputList, buttonElement);
    }

//имеет приватные методы, которые обрабатывают форму:
// проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики
  //функция вставляет текст переданного сообщения об ошибке и включает выделение переданного input
   _showInputError(formElement, inputElement, errorMessage, formObj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция удаляет текст сообщения об ошибке и убирает выделение переданного input
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // функция устанавливает слушатель каждого изменения данных в поле ввода для каждого input в наборе полей
// для каждого изменения в поле ввода данных вызываются две функции: checkInputValidity(набор полей, input)
//и toggleButtonState(массив inputов, кнопка отправки данных)
  _setEventListeners(inputList, buttonElement) {
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._checkInputValidity(this._fieldSet, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    const openButton = Array.from(sector.querySelectorAll(this.openButtonSelector));
    openButton.forEach((item) => {
      item.addEventListener('click', () => {
        // this._resetForm(inputList);
        inputList.forEach((input) => {
          this._hideInputError(this._fieldSet, input);
        });
        this._toggleButtonState(inputList, buttonElement);
      });
    });
};

//функция вызывает функцию  showInputError(набор полей, input, сообщение об ошибке), если input не проходит валидацию,
//наче - вызывает функцию  hideInputError(набор полей, input)
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

// функция ищет невалидное значение один раз для каждого элемента массива переданных inputов,
// до тех пор, пока не найдет таковое. Если такой элемент найден вернёт true, иначе - false.
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // функция делает недоступной и другого стиля кнопку отправки данных, если результатом функции  hasInvalidInput(переданный  массив inputов) = true,
  //иначе - делает кнопку доступной и возвращает ее активый стиль
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
  };
}
