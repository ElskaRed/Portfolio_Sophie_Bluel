// Ouverture/fermeture et focus modale //
// Code réalisé en suivant le TP de Grafikart //

let modal = null
const focusableSelector = "button, a, input, select";
let focusables = [];

// ouverture modale //

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.currentTarget.getAttribute("href"));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".fermer").addEventListener("click", closeModal);
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);
};

// fermeture modale //

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".fermer").removeEventListener("click", closeModal)
    modal.querySelector(".modal-wrapper").removeEventListener("click", stopPropagation)
    modal = null
};

const stopPropagation = function (e) { //empêche le clic sur la modale de la fermer//
    e.stopPropagation()
};

// gestion du focus enfermé dans la modale //

const focusInModal = function(e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
    if (e.shiftKey === true) {
        index--
    } else {
    index++
    }
    debugger
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus();
};

//eventListeners//

document.querySelectorAll(".js-modal").forEach(a => { //eventListener qui appelle l'ouverture de la modale//
    a.addEventListener("click", openModal)
});

window.addEventListener("keydown", function (e) { 
    if (e.key === "Escape" || e.key === "Esc") { //femeture de la modale en appuyant sur échap//
        closeModal(e)
    } 
    if (e.key ==="Tab" && modal !== null) { //appel de la fonction focusInModal si appui sur tab et modale ouverte//
        focusInModal(e)
    }
});