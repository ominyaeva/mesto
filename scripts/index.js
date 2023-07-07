const editPopup = document.querySelector("#popup");
const addPopup = document.querySelector("#add-popup");
const popupImages = document.querySelector("#image-popup");

const popupOpenButtonElement = document.querySelector(".profile__open-popup");
const popupAddButtonElement = document.querySelector(".profile__add-popup");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");

const popupMain = editPopup.querySelector(".popup__text");
const popupForm = editPopup.querySelector(".popup__content");
const popupAddForm = addPopup.querySelector(".popup__content");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__subtitle");
const popupInputName = popupMain.querySelector(".form__input_input_name");
const popupInputDescription = popupMain.querySelector(".form__input_input_description");

const cardsTemplate = document.querySelector(".cards");
const popupAddTitle = document.querySelector(".form__input_input_title");
const popupAddLink = document.querySelector(".form__input_input_link");
const popupImage = document.querySelector(".popup__card-image");
const popupCardTitle = document.querySelector(".popup__card-title");

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
    document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.addEventListener('keydown', closeByEsc)
}

popupOpenButtonElement.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
    openPopup(editPopup);
});

popupAddButtonElement.addEventListener("click", function (evt) {
    evt.preventDefault();
    openPopup(addPopup);
});

closeButtons.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closePopup(popup));
});

function closeByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function closePopupOverlay() {
    popups.forEach((el) => {
        el.addEventListener("mousedown", function (evt) {
            if (evt.target.classList.contains("popup_opened")) {
                closePopup(evt.target);
            }
        });
    });
}

closePopupOverlay();

function likeElement(evt) {
    evt.target.classList.toggle("card__like_active");
}
function deleteElement(evt) {
    evt.target.closest(".card").remove();
}
function createCard(value) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonLike = cardElement.querySelector(".card__like");

    cardTitle.textContent = value.name;
    cardImage.src = value.link;
    cardImage.alt = value.name;

    function popupImageOpen() {
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

const renderElements = (value) => cardsTemplate.prepend(createCard(value));
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
    evt.submitter.classList.add('form__button_invalid')
    evt.submitter.disabled = true;
    closePopup(addPopup);
}

popupAddForm.addEventListener("submit", addCardFormSubmit);
