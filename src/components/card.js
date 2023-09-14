import {openPopup} from './modal';
import {askToDelete, selfId,likeCard} from './api'
const imagePopup = document.querySelector('.image-popup');
const cardList = document.querySelector('.element-list');
const cardTemplate = document.getElementById('element-list__card-template');

function addCardListeners(card,name,url,addDeleteButton,cardId){
  const newLike = card.querySelector('.element-list__like-button')
  const newDelete = card.querySelector('.element-list__trash-button');
  const cardImage = card.querySelector('.element-list__image');
  newLike.addEventListener('click',function(){
    likeCard(cardId,card);
    // newLike.classList.toggle('element-list__like-button_liked');
  });
  if (addDeleteButton){
    newDelete.addEventListener('click',function(){
      card.remove();
      askToDelete(cardId)
    });
  } else {
    newDelete.classList.add("button_hidden");
    newDelete.disabled = true;
  }
  cardImage.addEventListener('click',function(){
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__image').src = url;
    imagePopup.querySelector('.popup__text').textContent = name;
  });
}

export function addCard(newCard){
  cardList.prepend(newCard);

}  

export function renderCard(query){
  const newCard =
        cardTemplate.content.querySelector('.element-list__card').cloneNode(true);
  newCard.querySelector('.element-list__image').src = query.link;
  newCard.querySelector('.element-list__image').alt = query.name;
  newCard.querySelector('.element-list__text').textContent = query.name;
  newCard.querySelector('.element-list__like-counter').textContent = query.likes.length;
  const cardLikesCopy = Array.from(JSON.parse(JSON.stringify(query.likes))).map(elem => elem._id);
  if (query.likes.map(elem => elem._id).some(elem => elem === selfId)){
    newCard.querySelector('.element-list__like-button').classList.toggle('element-list__like-button_liked');
  }
  addCardListeners(newCard,query.name,query.url, query.owner._id === selfId, query._id);
  return newCard;
}

export function initialRender(initialCards){
  console.log("inrend");
  Array.from(initialCards).forEach(curelem => {
    // console.log("DEBUG: ",  curelem.name,curelem.link);
    addCard(renderCard(curelem));
  });
  
}
