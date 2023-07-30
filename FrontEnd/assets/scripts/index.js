const filtres = document.querySelector(".filtres");
const gallery = document.querySelector('.gallery');
const btnTous = document.createElement('button');

function afficherTravaux(data) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = '';
  
  data.forEach((item) => {
    const imageUrl = item.imageUrl;
    const description = item.title;

    const figureElement = document.createElement("figure");
    gallery.appendChild(figureElement);

    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = item.title;
    figureElement.appendChild(imgElement);

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.textContent = item.title;
    figureElement.appendChild(figcaptionElement);
  });
}

function getWorks() {
  return fetch("http://localhost:5678/api/works", {
    headers: { "accept": "application/json", "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
    });
}


function getCategory() {
  return fetch("http://localhost:5678/api/categories", {
    headers: { "accept": "application/json", "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(categories => {
      btnTous.innerText = "Tous";
      filtres.appendChild(btnTous);
      btnTous.classList.add('filtres__boutons');
      categories.forEach(cat => {
        bouton = document.createElement('button');
        bouton.dataset.id = cat.id;
        bouton.textContent = cat.name;
        bouton.classList.add('filtres__boutons');
        filtres.appendChild(bouton);
      })
      const filtresBoutons = document.querySelectorAll('.filtres__boutons');
      filtresBoutons.forEach(btn => btn.addEventListener("click", (event) => {
        monFiltre(event);
        filtresBoutons.forEach(btn => btn.classList.remove('filtres__boutons--select'));
        btn.classList.add('filtres__boutons--select');
      }));
      })
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
  });
}

function monFiltre(event) {
  console.log(event);
  console.log(event.currentTarget.dataset.id);
  if(!event.currentTarget.dataset.id) return afficherTravaux(worksData);
  const categoryId = parseInt(event.currentTarget.dataset.id);
  const filteredData = worksData.filter(work => categoryId === work.category.id)
  afficherTravaux(filteredData);
}

let worksData;
function setupData(data) {
  worksData = data;
}

document.addEventListener("DOMContentLoaded", () => {
  getWorks()
    .then(travaux => {
      afficherTravaux(travaux);
      setupData(travaux);
    });
  getCategory();
});



//Portion de code qui gère les différents contenus de la modale//

const contenuModal = document.querySelector(".contenu-modal");

        // Déclaration de la fonction qui génère les catégories dans les options //

function generateCat() {
    return fetch("http://localhost:5678/api/categories", {
        headers: { "accept": "application/json", "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(categories => {
            let optionsHTML = "";
            categories.forEach((category) => {
            optionsHTML = `<option value=${category.name}</option>`;
        })
        return optionsHTML;
    });
}

        // Déclaration affichage de la fenêtre modale d'édition/suppression des travaux //

const boutonRetour = document.querySelector(".retour");

async function afficherModalTravaux() {
  boutonRetour.style.display = "none";
  contenuModal.innerHTML = "";

  const galerieModal = document.createElement("div");
  galerieModal.classList.add("galerie-modal");
  contenuModal.appendChild(galerieModal);

  try {
    const works = await getWorks();
    console.log(works);

    let contenuModalHTML = `
    <div class="galerie-modal">
      ${works.map((item) => `
        <figure class="projet-modal-figure">
          <div class="projet-modal">
            <img src="${item.imageUrl}" class="image-projet-modal">
            <button class="editer-bouton-modal">éditer</button>
          </div>
          <button class="icone-supprimer icone1" data-id="${item.id}">
            <i class="fa-solid fa-trash-can fa-xs icone-poubelle" style="color: #ffffff;"></i>
          </button>
          <button class="icone-deplacer icone2">
            <i class="fa-solid fa-up-down-left-right fa-xs" style="color: #ffffff;"></i>
          </button>
        </figure>
      `).join('')}
    </div>
    <div class="boutons-bas-modal">
      <div class="barre-modal"></div>
      <button class="bouton-ajouter-travail">Ajouter une photo</button>
      <button class="supprimer-modal">Supprimer la galerie</button>
    </div>
    `;
      
      contenuModal.innerHTML = contenuModalHTML;
  } catch (error) {
    console.log("Une erreur s'est produite:", error);
  }  
}


        // Déclaration affichage de la fenêtre modale d'ajout de travaux //

async function afficherModalAjout1() {
    contenuModal.innerHTML = "";
    contenuModal.innerHTML = 
        `
        <div class="contenu-modal">
            <div class="contenu-flexible-modal">
                <div class="ajouter-photo-modal1">
                    <div class="cadre-ajout-photo">
                        <img class="picture" src="assets/icons/picture.png" alt="icone de photographie">
                        <button class="bouton-ajout-photo">+ Ajouter photo</button>
                        <p>jpg, png : 4mo max</p>
                    </div>
                </div>
            </div>
            <form action="#" method="post">
                <label for="titre">Titre</label>
                <input type="text" name="titre" id="titre-form-modal">
                <label for="categorie">Catégorie</label>
                <select name="categorie" id="categories-modal">
                    <option value=""></option>
                    ${generateCat()}
                </select>
            </form>
            <div class="barre-modal"></div>
            <input type="submit" value="Valider" class="valider1">
        </div>
    `;
    const titreModal = document.querySelector(".titre-modal");
    titreModal.innerText = "Ajout photo";
}

        // Déclaration affichage de la fenêtre modale avec le bouton valider opérationnel //

function afficherModalAjout2() {

}

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
    afficherModalTravaux();
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

// gestion des fonctionnalités à l'intérieure de la fenêtre modale //

const boutonAjouterTravail = document.querySelector(".bouton-ajouter-travail");
console.log(boutonAjouterTravail);
boutonAjouterTravail.addEventListener("click", async () => {
  await afficherModalAjout1();
});