const profilePopup = document.querySelector('.rename-popup');
const addPopup = document.querySelector('.add-popup');
const formElement = profilePopup.querySelector('.form');
const formAddElement = addPopup.querySelector('.form');
const nameInput = formElement.querySelector('input[name="username"]');
const jobInput = formElement.querySelector('input[name="userjob"]'); 
const placeInput = formAddElement.querySelector('input[name="picturename"]');
const linkInput = formAddElement.querySelector('input[name="picturelink"]');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeProfilePopup = profilePopup.querySelector('.popup__close-button');
const closeAddPopup = addPopup.querySelector('.popup__close-button');
const imagePopup = document.querySelector('.image-popup')
const closeImagePopup = imagePopup.querySelector('.popup__close-button');
const profileName =  document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__quote');

const cardList = document.querySelector('.element-list');
const cardTemplate = document.getElementById('element-list__card-template');
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

editButton.addEventListener('click', function(){
  openPopup(profilePopup);
});

closeProfilePopup.addEventListener('click', function(){
  closePopup(profilePopup);
});

closeAddPopup.addEventListener('click', function(){
  closePopup(addPopup);
});

addButton.addEventListener('click',function(){
  openPopup(addPopup);
});
closeImagePopup.addEventListener('click',function(){
  closePopup(imagePopup);
});
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    evt.target.reset();
    closePopup(profilePopup);
}

function handleAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  
  renderCard(placeInput.value,linkInput.value);
  evt.target.reset();
  closePopup(addPopup);
}

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function renderCard(name, url){
  const newCard =
        cardTemplate.content.querySelector('.element-list__card').cloneNode(true);
  newCard.querySelector('.element-list__image').src = url;
  newCard.querySelector('.element-list__image').alt = name;
  newCard.querySelector('.element-list__text').textContent = name;
  cardList.append(newCard);
  const newLike = newCard.querySelector('.element-list__like-button')
  const newDelete = newCard.querySelector('.element-list__trash-button');
  const cardImage = newCard.querySelector('.element-list__image');
  newLike.addEventListener('click',function(){
    newLike.classList.toggle('element-list__like-button_liked');
  });
  newDelete.addEventListener('click',function(){
    newCard.remove();
  });
  cardImage.addEventListener('click',function(){
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__image').src = url;
    imagePopup.querySelector('.popup__text').textContent = name;
    console.log(imagePopup.querySelector('.popup__text'));
    console.log(imagePopup.querySelector('.popup__text').value);
  });
}

formElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit',handleAddSubmit);

initialCards.forEach(curelem => {
  renderCard(curelem.name,curelem.link);
});