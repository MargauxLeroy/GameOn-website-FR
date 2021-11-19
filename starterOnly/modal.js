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

form.onsubmit = (event) => {
  const isValid = validate();
  if (isValid === false) {
    event.preventDefault();
  }
};
