import {openPopup} from './modal.js';
import {askToDelete,likeCard} from './api.js'
import { selfId } from '../index.js';
import { imagePopup, popupImage, popupImageText, cardList, cardTemplate } from './imagePopup.js';
function addCardListeners(card,name,url,addDeleteButton,cardId){
  const newLike = card.querySelector('.element-list__like-button')
  const newDelete = card.querySelector('.element-list__trash-button');
  const cardImage = card.querySelector('.element-list__image');
  const newLikeCounter =  card.querySelector('.element-list__like-counter');
  
  newLike.addEventListener('click',function(){
    const alreadyLiked = newLike.classList.contains('element-list__like-button_liked');
    likeCard(cardId,alreadyLiked).then(res =>{
      newLike.classList.toggle('element-list__like-button_liked');
      newLikeCounter.textContent = res.likes.length;
    }).catch(err=>{
      console.log(err)
    });
  });
  if (addDeleteButton){
    newDelete.addEventListener('click',function(){
      askToDelete(cardId).then(()=>{
        card.remove();
      });
    });
  } else {
    newDelete.classList.add("button_hidden");
    newDelete.disabled = true;
  }
  cardImage.addEventListener('click',function(){
    openPopup(imagePopup);
    popupImage.src = url;
    popupImage.alt = name;
    popupImageText.textContent = name;
  });
}

export function addCard(newCard){
  cardList.prepend(newCard);

}  

export function renderCard(query){
  const newCard =
        cardTemplate.content.querySelector('.element-list__card').cloneNode(true);
  const newImage = newCard.querySelector('.element-list__image');
  newImage.src = query.link;
  newImage.alt = query.name;
  newCard.querySelector('.element-list__text').textContent = query.name;
  newCard.querySelector('.element-list__like-counter').textContent = query.likes.length;
  if (query.likes.map(elem => elem._id).some(elem => elem === selfId)){
    newCard.querySelector('.element-list__like-button').classList.toggle('element-list__like-button_liked');
  }
  addCardListeners(newCard,query.name,query.link, query.owner._id === selfId, query._id);
  return newCard;
}

export function doInitialRender(initialCards){
  console.log("inrend");
  Array.from(initialCards).forEach(card => {
    addCard(renderCard(card));
  });
  
}
