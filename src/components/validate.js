const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const error = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  error.classList.remove(validationSettings.errorClass);
  error.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return !(inputList.every((inputElement) => {
    return inputElement.validity.valid;
  }))
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
  }
};

const checkIfFormsValid = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

const addEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const button = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, button);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkIfFormsValid(formElement, inputElement);
      toggleButtonState(inputList, button);
    });
  });
};

export const enableValidation = () => {
  Array.from(document.querySelectorAll(validationSettings.formSelector)).forEach((formElement) => {
    addEventListeners(formElement, validationSettings);
  });
};

