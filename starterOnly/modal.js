function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// DOM Elements -> Inputs
const inputs = form.querySelectorAll("input");

const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const cityOptions = document.querySelector(".cityOptions");
const checkboxConditions = document.getElementById("checkbox1");
const checkboxWarning = document.getElementById("checkbox2");

const btnSubmit = document.querySelector(".btn-submit");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

////////////////////////////////////////////////////
//// #1 FERMETURE DE LA MODALE ////////////////////
////////////////////////////////////////////////////

function closeModal() {
  modalbg.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

////////////////////////////////////////////////////
///// #2 IMPLÉMENTER ENTRÉES DU FORMULAIRE ////////
////////////////////////////////////////////////////

function validate() {
  // Créé une "copie" du formulaire qui donne accès aux valeurs des champs
  const form = document.querySelector("form");
  console.log(form);
  const data = new FormData(form);

  const first = data.get("first");
  const last = data.get("last");
  const email = data.get("email");
  const birthdate = data.get("birthdate");
  const quantity = data.get("quantity");
  const location = data.get("location");

  // Conditions pour que le formulaire soit valide
  if (first.length < 2) {
    displayErrorFeedback(
      firstInput,
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
    );
    return false;
  }

  if (last.length < 2) {
    displayErrorFeedback(
      lastInput,
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    return false;
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    displayErrorFeedback(
      emailInput,
      "Veuillez saisir une adresse email valide."
    );
    return false;
  }

  const dateTime = new Date(birthdate).getTime();
  if (isNaN(dateTime)) {
    displayErrorFeedback(
      birthdateInput,
      "Vous devez entrer votre date de naissance."
    );
    return false;
  }

  if (isNaN(new Number(quantity)) || quantity === "") {
    displayErrorFeedback(quantityInput, "Vous devez entrer un nombre.");
    return false;
  }

  if (location === null) {
    displayErrorFeedback(cityOptions, "Vous devez choisir une option.");
    return false;
  }

  if (!checkboxConditions.checked) {
    displayErrorFeedback(
      checkboxWarning,
      "Vous devez vérifier que vous acceptez les termes et conditions."
    );
    return false;
  }

  return true;
}

/////////////////////////////////////////////////////
//// #3  AJOUTER VALIDATION OU MESSAGES D'ERREUR ///
////////////////////////////////////////////////////

// Création des messages d'erreurs
function createErrorMessage() {
  const errorMessage = document.createElement("span");
  errorMessage.classList.add("error-message");
  errorMessage.style.cssText = "color: red; font-size: 11px;";
  return errorMessage;
}

// Affichage des messages d'erreurs
function displayErrorFeedback(input, errorText) {
  errorMessage = createErrorMessage();
  errorMessage.innerHTML = errorText;
  input.after(errorMessage);
  input.style.outline = "2px solid red";
}

// Suppression des messages d'erreurs
function deleteErrorMessages() {
  let errorMessages = document.querySelectorAll(".error-message");
  // Supprime les outlines rouges des inputs
  cityOptions.style.outline = "none";
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.outline = "none";
  }
  // Retire les messages d'erreurs du DOM
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].remove();
  }
}

// Nécessite une première validation manuelle avant d'afficher les messages d'erreurs
let needDynamicValidation = false;

// Pour tous les champs... on vérifie dynamiquement qu'ils sont corrects sans envoyer la validation
for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  input.addEventListener("input", () => {
    if (!needDynamicValidation) return;
    validate(false);
  });
}

form.onsubmit = (event) => {
  const isValid = validate();
  if (isValid === false) {
    event.preventDefault();
  }
};
