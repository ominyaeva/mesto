const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__open-popup");

const popupMain = popupElement.querySelector(".popup__text");
const popupForm = popupElement.querySelector(".popup__content");

let profileName = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__subtitle");
let popupInputName = popupMain.querySelector(".popup__input_name");
let popupInputDescription = popupMain.querySelector(".popup__input_description");
const openPopup = function () {
    popupElement.classList.add("popup_opened");
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
};

const closePopup = function () {
    popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    popupForm.addEventListener("submit", closePopup);
}

popupForm.addEventListener("submit", handleFormSubmit);
