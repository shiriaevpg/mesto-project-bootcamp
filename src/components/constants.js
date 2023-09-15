export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1/',
  headers: {
    authorization: 'bc241b34-9853-4740-a621-84c50218ff40',
    'Content-Type': 'application/json'
  }
}
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const closeButtons = document.querySelectorAll('.popup__close-button');

export const profilePopup = document.querySelector('.rename-popup');
export const profileForm = profilePopup.querySelector('.form');
export const renameSaveButton = profilePopup.querySelector('.popup__save-button');

export const addPopup = document.querySelector('.add-popup');
export const addPopupSaveButton = addPopup.querySelector('.popup__save-button')
export const formAddElement = addPopup.querySelector('.form');
export const nameInput = profileForm.querySelector('input[name="username"]');
export const jobInput = profileForm.querySelector('input[name="userjob"]');
export const placeInput = formAddElement.querySelector('input[name="picturename"]');
export const linkInput = formAddElement.querySelector('input[name="picturelink"]');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__quote');
export const avatarPopup = document.querySelector('.edit-popup');
export const editAvatarButton = document.querySelector('.profile__avatar-edit');
export const avatarForm= avatarPopup.querySelector('.form');
export const profileAvatar = document.querySelector('.profile__avatar');
export const newUrl = avatarForm.querySelector('input[name="avatalink"]');
export const addSaveButton = addPopup.querySelector('.popup__save-button');
export const editSaveButton = avatarPopup.querySelector('.popup__save-button');

export const imagePopup = document.querySelector('.image-popup');
export const popupImage = imagePopup.querySelector('.popup__image');
export const popupImageText = imagePopup.querySelector('.popup__text');
export const cardList = document.querySelector('.element-list');
export const cardTemplate = document.getElementById('element-list__card-template');
