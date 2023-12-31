const filtres = document.querySelector(".filtres");
const gallery = document.querySelector('.gallery');
const btnTous = document.createElement('button');
let worksData;

const contenuModal = document.querySelector(".contenu-modal");
const boutonRetour = document.querySelector(".retour");

//fonction qui affiche les travaux dans la galerie de la page d'accueil//

function afficherTravaux(data) {
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

//fonction d'appel à l'API pour works//

function getWorks() {
  return fetch("http://localhost:5678/api/works", {
    headers: { "accept": "application/json", "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
    });
}

//fonction d'appel à l'API pour récupérer les catégories et créer les filtres//

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

//fonction qui trie les données récupérées par getWorks et qui les affiche en fonction du filtre//
function monFiltre(event) {
  console.log(event);
  console.log(event.currentTarget.dataset.id);
  if(!event.currentTarget.dataset.id) return afficherTravaux(worksData);
  const categoryId = parseInt(event.currentTarget.dataset.id);
  const filteredData = worksData.filter(work => categoryId === work.category.id)
  afficherTravaux(filteredData);
}

function setupData(data) {
  worksData = data;
}

//appel des fonctions au chargement de la page//
document.addEventListener("DOMContentLoaded", () => {
  getWorks()
    .then(travaux => {
      afficherTravaux(travaux);
      setupData(travaux);
    });
  getCategory();
});












//Portion de code qui gère le contenu de la première fenêtre modale//

        // Déclaration de la fonction qui génère les catégories dans les options //

async function generateCat() {
    const response = await fetch("http://localhost:5678/api/categories", {
        headers: { "accept": "application/json", "Content-Type": "application/json" }
    });
    const categories = await response.json();
    let categoriesModal = "";
    
    categories.forEach((category) => {
        categoriesModal += `<option value="${category.id}">${category.name}</option>`;
    });
    return categoriesModal;
}

        // Déclaration affichage de la fenêtre modale d'édition/suppression des travaux //

async function afficherModalTravaux() {

  //partie de la fonction qui affiche les éléments//

  const titreModal = document.querySelector(".titre-modal");
  titreModal.innerText = "Galerie photo";

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

  // partie de la fonction qui gère les fonctionnalités à l'intérieur de la modale //

  const boutonAjouterTravail = document.querySelector(".bouton-ajouter-travail");
  boutonAjouterTravail.addEventListener("click", afficherModalAjout);

  document.querySelectorAll(".icone-supprimer").forEach(bouton => bouton.addEventListener("click", (event) => {
    supprimerTravail(event);
    getWorks()
    .then(travaux => {
      afficherTravaux(travaux);
      setupData(travaux);
    });
  }));
}

        //déclaration de la fonction de suppression d'un travail dans la modale //

function supprimerTravail(event) {
  event.preventDefault();
  const workId = event.currentTarget.dataset.id;
  let token = localStorage.getItem("Token");
  console.log(token);

    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        "accept": "application/json", 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        console.log("Travail supprimé avec succès");
        afficherModalTravaux();
      } else {
        console.log("Erreur lors de la suppression du travail");
      }
    })
    .catch(error => console.log("Une erreur s'est produite:", error));
}












//Portion de code qui gère l'ajout d'un travail dans le formulaire modal//

      // Déclaration affichage de la fenêtre modale d'ajout de travaux //

async function afficherModalAjout() {
  const categoriesOptions = await generateCat();
    boutonRetour.style.display = "block";
    contenuModal.innerHTML = "";
    contenuModal.innerHTML = 
        `
        <div class="contenu-modal">
            <div class="contenu-flexible-modal">
                <div class="ajouter-photo-modal1">
                    <div class="cadre-ajout-photo">
                        <img class="picture" src="assets/icons/picture.png" alt="icone de photographie">
                        <label for="photo" class="bouton-ajout-photo background">+ Ajouter photo</label>
                        <input type="file" id="photo" class="photoinput background" name="photo">
                        <p class="background">jpg, png : 4mo max</p>
                        <img src="" class="photo-choisie">
                    </div>
                </div>
            </div>
            <form action="#" method="post">
                <label for="titre">Titre</label>
                <input type="text" name="titre" id="titre-form-modal">
                <label for="categorie">Catégorie</label>
                <select name="categorie" id="categories-modal">
                    <option value=""></option>
                    ${categoriesOptions}
                </select>
            </form>
            <div class="barre-modal"></div>
            <input type="submit" value="Valider" class="valider1">
        </div>
    `;
    const titreModal = document.querySelector(".titre-modal");
    titreModal.innerText = "Ajout photo"; //change le titre de la modale

    boutonRetour.addEventListener("click", afficherModalTravaux); //retour à la modale initiale

    const fileInput = document.getElementById("photo");
    const titreInput = document.getElementById("titre-form-modal");
    const categorieSelect = document.getElementById("categories-modal");
    const boutonValider = document.querySelector(".valider1");

    fileInput.addEventListener("change", (event) => {
    afficherImage(event);
    affichageBoutonValider();
    });
    titreInput.addEventListener("input", affichageBoutonValider);
    categorieSelect.addEventListener("change", affichageBoutonValider);    
    boutonValider.addEventListener("click", ajouterTravail);
}
    

//fonction chargée d'afficher l'image sélectionnée dans l'input//

function afficherImage(event) {
  const file = event.target.files[0];
  const photoChoisie = document.querySelector(".photo-choisie");
  if (file) {
    const reader = new FileReader();
    const backgroundElements = document.querySelectorAll(".background");

    reader.addEventListener("load", function () {
      photoChoisie.src = reader.result;
    });

    reader.readAsDataURL(file);
    backgroundElements.forEach(background => background.classList.add("photo-choisie-background"));
  }
}

//fonction qui change visuellement le bouton valider lorsque les conditions sont remplies//

function affichageBoutonValider() {
  const fileInput = document.getElementById("photo");
  const BoutonValider = document.querySelector(".valider1");
  const titreInput = document.getElementById("titre-form-modal");
  const categorieSelect = document.getElementById("categories-modal");

  if (fileInput.files.length > 0 && titreInput.value.trim() !== "" && categorieSelect.value !=="") {
    BoutonValider.classList.add("valider2");
  } else {
    BoutonValider.classList.remove("valider2");
  }
}

// Fonction qui renvoie les données du formulaire à l'API en ligne pour ajouter un travail //

function ajouterTravail(event) {
  const fileInput = document.getElementById("photo");
  const titreInput = document.getElementById("titre-form-modal");
  const categorieSelect = document.getElementById("categories-modal");

  if (fileInput.files.length === 0 || titreInput.value.trim() === "" || categorieSelect.value === "") {
    alert("Veuillez ajouter une photo et remplir tous les champs du formulaire pour valider.");
    return;
  }

  let formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("title", titreInput.value);
  formData.append("category", categorieSelect.value);

  let request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  };

  fetch("http://localhost:5678/api/works", request)
  .then((response) => {
    if (response.ok) {
      alert("Le travail a bien été ajouté à la galerie.");
    } else {
      alert("Une erreur s'est produite lors de l'ajout du nouveau travail.");
    }
  });
}










// Ouverture/fermeture et focus modale //
// Code réalisé en suivant le TP de Grafikart //

let modal = null
const focusableSelector = "button, a, input, select";
let focusables = [];

            // ouverture modale //

const openModal = function (e) {
    e.preventDefault()
    modal = document.getElementById("modal1");
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


//eventListener qui appelle l'ouverture de la modale//
document.querySelector(".js-modal").addEventListener("click", openModal);

window.addEventListener("keydown", function (e) { 
    if (e.key === "Escape" || e.key === "Esc") { //femeture de la modale en appuyant sur échap//
        closeModal(e)
    } 
    if (e.key ==="Tab" && modal !== null) { //appel de la fonction focusInModal si appui sur tab et modale ouverte//
        focusInModal(e)
    }
});


