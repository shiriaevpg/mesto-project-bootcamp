import "../src/pages/index.css";
import { enableValidation } from "./components/validate.js";
import { doInitialRender,addCard,renderCard } from "./components/card.js";
import { getProfileInfo, getInitialCards, updateAccount, sendCard, updateAvatar} from "./components/api.js";
// import  "./components/modal";
import {openPopup,closePopup} from"./components/modal.js";
import * as constants from "./components/constants";
export let selfId;
constants.editButton.addEventListener('click', function () {
  openPopup(constants.profilePopup);
  constants.nameInput.value = constants.profileName.textContent;
  constants.jobInput.value = constants.profileJob.textContent;
});

constants.addButton.addEventListener('click', function () {
  openPopup(constants.addPopup);
});

constants.editAvatarButton.addEventListener('click',function(){
  openPopup(constants.avatarPopup);
});

constants.closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  constants.profileName.textContent = constants.nameInput.value;
  constants.profileJob.textContent = constants.jobInput.value;
  constants.renameSaveButton.textContent = "Сохраняется";
  updateAccount(constants.nameInput.value,constants.jobInput.value).then(() =>{
    evt.target.reset();
    closePopup(constants.profilePopup);
  })
    .catch(err=>{console.log(err)})
    .finally(()=>{
    constants.renameSaveButton.textContent = "Сохранить";
    });
}

function handleAddSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  constants.addSaveButton.textContent = "Сохраняется"
  sendCard(constants.placeInput.value, constants.linkInput.value).then(
    addQuery =>{
    addCard(renderCard(addQuery));
    evt.target.reset();
    constants.addSaveButton.setAttribute("disabled", "disabled");
    closePopup(constants.addPopup);
    }
  ).catch(err=>{console.log(err)}).finally(()=>{
    constants.addSaveButton.textContent = "Создать"
  }
  );
}
function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  constants.editSaveButton.textContent="Сохраняется"
  updateAvatar(constants.newUrl.value).then(() =>{
    constants.profileAvatar.src = constants.newUrl.value;
    closePopup(constants.avatarPopup);
    evt.target.reset();
  }).catch(err=>{console.log(err)}).finally(()=>{
    constants.editSaveButton.textContent="Сохранить"
  })
}
constants.profileForm.addEventListener('submit', handleProfileFormSubmit);
constants.formAddElement.addEventListener('submit', handleAddSubmit);
constants.avatarForm.addEventListener('submit', handleAvatarFormSubmit)
enableValidation(constants.validationSettings);

// getProfileInfo().then(res => {
//   constants.profileAvatar.src = res.avatar;
//   constants.profileName.textContent = res.name;
//   constants.profileJob.textContent = res.about;
//   selfId = res._id;
// }).catch(err=>{
//   console.log("An error has occured",err)
// });

// getInitialCards().then((result) => {
//   doInitialRender(result);
// }).catch(err=>{
//   console.log(err)
// });

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, cards]) => {
      // тут установка данных пользователя
      constants.profileAvatar.src = userData.avatar;
      constants.profileName.textContent = userData.name;
      constants.profileJob.textContent = userData.about;
      selfId = userData._id;
      // и тут отрисовка карточек
      doInitialRender(cards);
  })
  .catch(err => {
    console.log(err);
  });
 