const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__open-popup");

const heart = document.querySelectorAll(".element__like");
const popupMain = popupElement.querySelector(".popup__text");
const popupForm = popupElement.querySelector(".popup__content");
const profileInfo = document.querySelector(".profile__info");

const openPopup = function () {
    popupElement.classList.add("popup_is-opened");
};
profileInfo.innerHTML = `
        <h1 class="profile__title">Жак-Ив Кусто</h1>
        <p class="profile__subtitle">Исследователь океана</p>
  `;

let inputName = document.querySelector(".profile__title").textContent;
let inputDescription = document.querySelector(".profile__subtitle").textContent;
let popupInputName = popupMain.querySelector(".popup__item-name");
let popupInputDescription = popupMain.querySelector(".popup__item-description");

popupInputName.value = inputName;
popupInputDescription.value = inputDescription;

const closePopup = function () {
    popupElement.classList.remove("popup_is-opened");
    popupInputName.value = inputName;
    popupInputDescription.value = inputDescription;
};

const closeSubmit = function () {
    popupElement.classList.remove("popup_is-opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

heart.forEach((heart) => {
    heart.addEventListener("click", () => {
        if (heart.classList.contains("black")) {
            heart.classList.remove("black");
            heart.classList.add("white");
            heart.src = "./images/whiteHeart.svg";
        } else {
            heart.classList.remove("white");
            heart.classList.add("black");
            heart.src = "./images/blackHeart.svg";
        }
    });
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    let popupInputName = popupMain.querySelector(".popup__item-name").value;
    let popupInputDescription = popupMain.querySelector(".popup__item-description").value;
    let inputName = document.querySelector(".profile__title");
    let inputDescription = document.querySelector(".profile__subtitle");
    inputName.value = popupInputName;
    inputDescription.value = popupInputDescription;

    profileInfo.innerHTML = `
        <h1 class="profile__title">${inputName.value}</h1>
        <p class="profile__subtitle">${inputDescription.value}</p>
  `;
}

popupForm.addEventListener("submit", handleFormSubmit);
popupForm.addEventListener("submit", closeSubmit);
