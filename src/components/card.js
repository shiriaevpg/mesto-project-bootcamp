import {openPopup} from './modal';

const imagePopup = document.querySelector('.image-popup');
const cardList = document.querySelector('.element-list');
const cardTemplate = document.getElementById('element-list__card-template');

function addCardListeners(card,name,url){
  const newLike = card.querySelector('.element-list__like-button')
  const newDelete = card.querySelector('.element-list__trash-button');
  const cardImage = card.querySelector('.element-list__image');
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

export function addCard(newCard){
  cardList.prepend(newCard);

}  

export function renderCard(name, url){
  const newCard =
        cardTemplate.content.querySelector('.element-list__card').cloneNode(true);
  newCard.querySelector('.element-list__image').src = url;
  newCard.querySelector('.element-list__image').alt = name;
  newCard.querySelector('.element-list__text').textContent = name;
  addCardListeners(newCard,name,url);
  return newCard;
}

export function initialRender(initialCards){
  console.log("inrend");
  initialCards.forEach(curelem => {
    addCard(renderCard(curelem.name,curelem.link));
  });
  
}
