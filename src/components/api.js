import {config} from './constants.js'

  function checkResponce(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
function requestAndProcess(url,method){
  return fetch(url,{
    headers: config.headers,
    method: method
  }).then(checkResponce);
}

function requestWithBodyAndProcess(url,method,body){
  return fetch(url,{
    headers: config.headers,
    method: method,
    body: body
  }).then(checkResponce);
}

export function getProfileInfo(){
  return requestAndProcess(config.baseUrl+'users/me',"GET")
}

export function getInitialCards(){
  return requestAndProcess(config.baseUrl+'cards',"GET"); 
}

export function updateAccount(newName,newAbout){
  return requestWithBodyAndProcess(config.baseUrl+'users/me',"PATCH",JSON.stringify({
    name: newName,
    about: newAbout
  }))
}
export function sendCard(name,link){
  return requestWithBodyAndProcess(config.baseUrl+'cards/',"POST",JSON.stringify({
    name: name,
    link: link
  }))
}
export function askToDelete(id){
  return requestAndProcess(config.baseUrl+'cards/'+id,"DELETE").catch(err => {console.log(err)});
}

export function likeCard(id,deleteOrPut){
  return requestAndProcess(config.baseUrl+'cards/likes/'+id, deleteOrPut ? "DELETE" : "PUT" );
}
 

export function updateAvatar(newAvatar){
return requestWithBodyAndProcess(config.baseUrl +'users/me/avatar',"PATCH",JSON.stringify({
  avatar: newAvatar
}))
}