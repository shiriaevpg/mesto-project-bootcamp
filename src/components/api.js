

import { initialRender,addCard,renderCard} from "./card";
import { profileName, profileJob, profileAvatar} from "../index";
export let selfId;
const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1/',
    headers: {
      authorization: 'bc241b34-9853-4740-a621-84c50218ff40',
      'Content-Type': 'application/json'
    }
  }
function smartRequest(url,method){
  return fetch(url,{
    headers: config.headers,
    method: method
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function smartRequestWithBody(url,method,body){
  return fetch(url,{
    headers: config.headers,
    method: method,
    body: body
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getProfileInfo(){
  smartRequest(config.baseUrl+'users/me',"GET")
    .then(res => {
      profileAvatar.src = res.avatar;
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
      selfId = res._id;
    }).catch(err=>{
      console.log("An error has occured",err)
    })
}

export function getInitialCards(){
  smartRequest(config.baseUrl+'cards',"GET")
  .then((result) => {
    initialRender(result);
  }).catch(err=>{
    console.log(err)
  }); 
}

export function updateAccount(newName,newAbout){
  return smartRequestWithBody(config.baseUrl+'users/me',"PATCH",JSON.stringify({
    name: newName,
    about: newAbout
  }))
}
export function sendCard(name,link){
  return smartRequestWithBody(config.baseUrl+'cards/',"POST",JSON.stringify({
    name: name,
    link: link
  })).then(
    addQuery =>{
    addCard(renderCard(addQuery));
    }
  )
}
export function askToDelete(id){
  smartRequest(config.baseUrl+'cards/'+id,"DELETE").catch(err => {console.log(err)});
}

export function likeCard(id,card){
  const newLikeCounter =  card.querySelector('.element-list__like-counter');
  const alreadyLiked = card.querySelector('.element-list__like-button').classList.contains('element-list__like-button_liked');
  smartRequest(config.baseUrl+'cards/likes/'+id, alreadyLiked ? "DELETE" : "PUT",).then( res =>{
    card.querySelector('.element-list__like-button').classList.toggle('element-list__like-button_liked');
    newLikeCounter.textContent = res.likes.length;
  });
}

export function updateAvatar(newAvatar){
return smartRequestWithBody(config.baseUrl +'users/me/avatar',"PATCH",JSON.stringify({
  avatar: newAvatar
})).then(() =>{
  profileAvatar.src = newAvatar;
}).catch(err=>{console.log(err)});
}
 

// fetch('https://nomoreparties.co/v1/cohortId/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// }); 