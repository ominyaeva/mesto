const editPopup = document.querySelector("#popup");
const addPopup = document.querySelector("#add-popup");
const popupImages = document.querySelector("#image-popup");

const popupProfileCloseButton = editPopup.querySelector(".popup__profile-close");
const popupAddCloseButton = addPopup.querySelector(".popup__add-close");
const popupImageCloseButton = popupImages.querySelector(".popup__image-close");
const popupOpenButtonElement = document.querySelector(".profile__open-popup");
const popupAddButtonElement = document.querySelector(".profile__add-popup");

const popupMain = editPopup.querySelector(".popup__text");
const popupForm = editPopup.querySelector(".popup__content");
const popupAddForm = addPopup.querySelector(".popup__content");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const popupInputName = popupMain.querySelector(".popup__input_input_name");
const popupInputDescription = popupMain.querySelector(".popup__input_input_description");

const cardsTemplate = document.querySelector(".cards");
const popupCardTitle = document.querySelector(".popup__input_type_title");
const popupCardLink = document.querySelector(".popup__input_type_link");
const popupAddTitle = document.querySelector(".popup__input_input_title");
const popupAddLink = document.querySelector(".popup__input_input_link");

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

popupOpenButtonElement.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
    openPopup(editPopup);
});

popupProfileCloseButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    closePopup(editPopup);
});

popupAddButtonElement.addEventListener("click", function (evt) {
    evt.preventDefault();
    openPopup(addPopup);
});

popupAddCloseButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    closePopup(addPopup);
});

popupImageCloseButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    closePopup(popupImages);
});

function likeElement(evt) {
    evt.target.classList.toggle("card__like_active");
}

function deleteElement(evt) {
    evt.target.closest(".card").remove();
}

function addCardImage(value) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonLike = cardElement.querySelector(".card__like");

    cardTitle.textContent = value.name;
    cardImage.src = value.link;
    cardImage.alt = value.name;

    cardsTemplate.prepend(cardElement);

    function popupImageOpen() {
        const popupImage = document.querySelector(".popup__card-image");
        const popupCardTitle = document.querySelector(".popup__card-title");

        popupCardTitle.textContent = cardTitle.textContent;
        popupImage.src = cardImage.src;
        popupImage.alt = cardTitle.textContent;
        openPopup(popupImages);
    }

    cardButtonLike.addEventListener("click", likeElement);
    cardDeleteButton.addEventListener("click", deleteElement);
    cardImage.addEventListener("click", popupImageOpen);
    return cardElement;
}

const renderElements = (value) => cardsTemplate.prepend(addCardImage(value));
initialCards.forEach((value) => {
    renderElements(value);
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(editPopup);
}

popupForm.addEventListener("submit", handleFormSubmit);

function addCardFormSubmit(evt) {
    evt.preventDefault();
    renderElements({
        name: popupAddTitle.value,
        link: popupAddLink.value,
    });
    evt.target.reset();
    closePopup(addPopup);
}

popupAddForm.addEventListener("submit", addCardFormSubmit);
