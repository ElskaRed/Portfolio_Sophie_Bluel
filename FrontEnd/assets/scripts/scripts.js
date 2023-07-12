// Fonction permettant la récupération dynamique des travaux depuis l'API

fetch("http://localhost:5678/api/works",{
  headers: {"accept": "application/json", "Content-Type": "application/json"}
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach((item, index) => {
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
  })
  .catch(error => {
    console.log("Une erreur s\'est produite:", error);
  });

// Filtres
    //Visuel, changement de classe CSS
const filtresBoutons = document.querySelectorAll('.filtres__boutons');

const selectionBouton = (event) => {
  filtresBoutons.forEach(bouton => {
    bouton.classList.remove("filtres__boutons--select");
  });
  event.target.classList.add("filtres__boutons--select");
};

filtresBoutons.forEach(bouton => {
  bouton.addEventListener("click", selectionBouton);
});

