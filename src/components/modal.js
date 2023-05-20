import { renderCard } from "./card";
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupOverlays = Array.from(document.querySelectorAll('.popup__overlay'));
const profilePopup = document.querySelector('.rename-popup');
const addPopup = document.querySelector('.add-popup');
const formElement = profilePopup.querySelector('.form');
const formAddElement = addPopup.querySelector('.form');
const allPopups = Array.from(document.querySelectorAll('.popup'));
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="userjob"]');
const placeInput = formAddElement.querySelector('input[name="picturename"]');
const linkInput = formAddElement.querySelector('input[name="picturelink"]');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__quote');

export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  evt.target.reset();
  closePopup(profilePopup);
}

export function handleAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard(placeInput.value, linkInput.value);
  evt.target.reset();
  closePopup(addPopup);
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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


popupOverlays.forEach((curOverlay) => {
  curOverlay.addEventListener('click', () => {
    const popup = curOverlay.closest('.popup_opened');
    if (popup) {
      closePopup(popup);
    }
  });
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    allPopups.forEach((popup) => closePopup(popup));
    // closePopup(profilePopup);
    // closePopup(addPopup);
    // closePopup(imagePopup);
  }
});

formElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit', handleAddSubmit);