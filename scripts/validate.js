function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function disbaledButton(buttonElement, config) {
    buttonElement.disabled = "disabled";
    buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
    if (!isActive) {
        disbaledButton(buttonElement, config);
    } else {
        enableButton(buttonElement, config);
    }
}
function checkInputValidity(inputElement, formElement, config) {
    inputElement.setCustomValidity("");

    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!errorElement) return;

    if (!isInputValid) {
        showError(inputElement, errorElement, config);
    } else {
        hideError(inputElement, errorElement, config);
    }
}
function setEventListener(formElement, config) {
    const inputsList = formElement.querySelectorAll(config.inputSelector);
    const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    [...inputsList].forEach((inputItem) => {
        inputItem.addEventListener("input", () => {
            checkInputValidity(inputItem, formElement, config);
            toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);

    [...forms].forEach((formItem) => {
        setEventListener(formItem, config);
    });
}

const configFormSelector = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_invalid",
    inputErrorClass: "form__input_state_invalid",
};

enableValidation(configFormSelector);
