import '../src/pages/index.css';
import { enableValidation } from './components/validate';
import { initialRender,addCard,renderCard } from './components/card';
// import  './components/modal';
import {openPopup,closePopup} from'./components/modal';
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profilePopup = document.querySelector('.rename-popup');
const addPopup = document.querySelector('.add-popup');
const formElement = profilePopup.querySelector('.form');
const formAddElement = addPopup.querySelector('.form');
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="userjob"]');
const placeInput = formAddElement.querySelector('input[name="picturename"]');
const linkInput = formAddElement.querySelector('input[name="picturelink"]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__quote');

editButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  evt.target.reset();
  closePopup(profilePopup);
}

function handleAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addCard(renderCard(placeInput.value, linkInput.value));
  placeInput.value = "";
  linkInput.value = "";
  evt.target.reset();
  addPopup.querySelector('.popup__save-button').setAttribute("disabled", "disabled");
  closePopup(addPopup);
}
formElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit', handleAddSubmit);
enableValidation(validationSettings);
initialRender(initialCards);