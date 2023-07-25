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
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const filtresBoutons = document.querySelectorAll('.filtres__boutons');
  const gallery = document.querySelector('.gallery');
  let worksData = [];
  let categoriesData = [];

  function monFiltre(clickedButton) {
    const buttonIndex = Array.from(filtresBoutons).indexOf(clickedButton);
    const category = categoriesData[buttonIndex - 1];
    const filteredData = category ? worksData.filter(item => item.category.id === category.id) : worksData;
    afficherTravaux(filteredData);

    filtresBoutons.forEach((bouton) => {
      bouton.classList.remove('filtres__boutons--select');
    });
    clickedButton.classList.add('filtres__boutons--select');
  }

  getWorks()
    .then((travaux) => {
      worksData = travaux;
      afficherTravaux(travaux);
    });

  getCategory()
    .then((categories) => {
      categoriesData = categories;

      filtresBoutons.forEach((bouton) => {
        bouton.addEventListener("click", () => {
          monFiltre(bouton);
        });
      });
    });
});