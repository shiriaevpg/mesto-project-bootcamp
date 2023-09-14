import '../src/pages/index.css';
import { enableValidation } from './components/validate';
import { initialRender,addCard,renderCard } from './components/card';
import { getProfileInfo, getInitialCards, updateAccount, sendCard, updateAvatar } from './components/api';
// import  './components/modal';
import {openPopup,closePopup} from'./components/modal';
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profilePopup = document.querySelector('.rename-popup');
const addPopup = document.querySelector('.add-popup');
export const formElement = profilePopup.querySelector('.form');
const formAddElement = addPopup.querySelector('.form');
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="userjob"]');
const placeInput = formAddElement.querySelector('input[name="picturename"]');
const linkInput = formAddElement.querySelector('input[name="picturelink"]');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__quote');

const editPopup = document.querySelector('.edit-popup')
const editAvatarButton = document.querySelector('.profile__avatar-edit');
const formEditElement = editPopup.querySelector('.form')
export const profileAvatar = document.querySelector('.profile__avatar')
const newUrl = formEditElement.querySelector('input[name="avatalink"]')

const renameSaveButton = profilePopup.querySelector('.popup__save-button');
const addSaveButton = addPopup.querySelector('.popup__save-button');
const editSaveButton = editPopup.querySelector('.popup__save-button');
editButton.addEventListener('click', function () {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

editAvatarButton.addEventListener('click',function(){
  openPopup(editPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  renameSaveButton.textContent = "Сохраняется";
  updateAccount(nameInput.value,jobInput.value)
    .catch(err=>{console.log(err)})
    .finally(()=>{
    renameSaveButton.textContent = "Сохранить";
    });
  evt.target.reset();
  closePopup(profilePopup);
}

function handleAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addSaveButton.textContent = "Сохраняется"
  sendCard(placeInput.value, linkInput.value).then(()=>{
    placeInput.value = "";
    linkInput.value = "";
    evt.target.reset();
    addPopup.querySelector('.popup__save-button').setAttribute("disabled", "disabled");
    closePopup(addPopup);
  }).catch(err=>{console.log(err)}).finally(()=>{
    addSaveButton.textContent = "Создать"
  }
  );
}
function handleEditSubmit(evt){
  evt.preventDefault();
  editSaveButton.textContent="Сохраняется"
  updateAvatar(newUrl.value).finally(()=>{
    editSaveButton.textContent="Сохранить"
  });
  evt.target.reset();
  closePopup(editPopup);
}
formElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit', handleAddSubmit);
formEditElement.addEventListener('submit', handleEditSubmit)
enableValidation(validationSettings);
getProfileInfo();
getInitialCards();