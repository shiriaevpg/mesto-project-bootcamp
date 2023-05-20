import {openPopup} from './modal';

const imagePopup = document.querySelector('.image-popup');
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

function addCardListeners(card,name,url){
  const newLike = card.querySelector('.element-list__like-button')
  const newDelete = card.querySelector('.element-list__trash-button');
  const cardImage = card.querySelector('.element-list__image');
  console.log(newDelete);
  newLike.addEventListener('click',function(){
    newLike.classList.toggle('element-list__like-button_liked');
  });
  newDelete.addEventListener('click',function(){
    card.remove();
  });
  cardImage.addEventListener('click',function(){
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__image').src = url;
    imagePopup.querySelector('.popup__text').textContent = name;
  });
}
function addCard(newCard){cardList.prepend(newCard);}  

export function renderCard(name, url){
  const newCard =
        cardTemplate.content.querySelector('.element-list__card').cloneNode(true);
  newCard.querySelector('.element-list__image').src = url;
  newCard.querySelector('.element-list__image').alt = name;
  newCard.querySelector('.element-list__text').textContent = name;
  addCard(newCard);
  addCardListeners(newCard,name,url);
}

export function initialRender(){
  console.log("inrend");
  initialCards.forEach(curelem => {
    renderCard(curelem.name,curelem.link);
  });
  
}
