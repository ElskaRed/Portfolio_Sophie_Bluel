// Fonction pour afficher les travaux

const AfficherTravaux = (data) => {
  data.forEach((item) => {
    const imageUrl = item.imageUrl;
    const description = item.title;

    const gallery = document.querySelector(".gallery");
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
};

// fonction pour récupérer les travaux depuis l'API

const getWorks = () => {
  return fetch("http://localhost:5678/api/works",{
    headers: {"accept": "application/json", "Content-Type": "application/json"}
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Une erreur s\'est produite:", error);
    });
};

// Appel de la fonction de récupération + affichage des travaux

getWorks()
  .then(data => {
    console.log(data);
    AfficherTravaux(data);
  });

// Filtres

fetch ("http://localhost:5678/api/category",{
  headers: {"accept": "application/json", "Content-Type": "application/json"}
})

const filtresBoutons = document.querySelectorAll('.filtres__boutons');
const gallery = document.querySelector("gallery");

filtresBoutons.forEach(bouton => {
  bouton.addEventListener("click", selectionBouton);
});

const selectionBouton = (event) => {
  filtresBoutons.forEach(bouton => {
    bouton.classList.remove("filtres__boutons--select");
  });
  event.target.classList.add("filtres__boutons--select");
};



