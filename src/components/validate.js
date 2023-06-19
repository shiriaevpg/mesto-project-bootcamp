
const showInputError = (formElement, inputElement, errorMessage,validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement,validationSettings) => {
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

const checkIfFormsValid = (formElement, inputElement,validationSettings) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement,validationSettings);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage,validationSettings);
  }
};

const addEventListeners = (formElement,validationSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const button = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, button);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, button);
      checkIfFormsValid(formElement, inputElement,validationSettings);
    });
  });
};

export const enableValidation = (validationSettings) => {
  Array.from(document.querySelectorAll(validationSettings.formSelector)).forEach((formElement) => {
    addEventListeners(formElement, validationSettings);
  });
};

