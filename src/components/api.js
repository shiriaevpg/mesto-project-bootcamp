const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1/',
    headers: {
      authorization: 'bc241b34-9853-4740-a621-84c50218ff40',
      'Content-Type': 'application/json'
    }
  }

  function CheckResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
function smartRequest(url,method){
  return fetch(url,{
    headers: config.headers,
    method: method
  }).then(CheckResponse);
}

function smartRequestWithBody(url,method,body){
  return fetch(url,{
    headers: config.headers,
    method: method,
    body: body
  }).then(CheckResponse);
}

export function getProfileInfo(){
  return smartRequest(config.baseUrl+'users/me',"GET")
}

export function getInitialCards(){
  return smartRequest(config.baseUrl+'cards',"GET"); 
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
  }))
}
export function askToDelete(id){
  return smartRequest(config.baseUrl+'cards/'+id,"DELETE").catch(err => {console.log(err)});
}

export function likeCard(id,deleteOrPut){
  return smartRequest(config.baseUrl+'cards/likes/'+id, deleteOrPut ? "DELETE" : "PUT" );
}

export function updateAvatar(newAvatar){
return smartRequestWithBody(config.baseUrl +'users/me/avatar',"PATCH",JSON.stringify({
  avatar: newAvatar
}))
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