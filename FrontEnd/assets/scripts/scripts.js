const filtres = document.querySelector(".filtres");
const gallery = document.querySelector('.gallery');

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
      const btnTous = document.createElement('button');
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
      const filtresBoutons = document.querySelectorAll('.filtres__boutons').forEach(btn => btn.addEventListener("click", monFiltre))
      })
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
  });
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

function monFiltre(event) {
  console.log(event);
  console.log(event.currentTarget.dataset.id);
  if(!event.currentTarget.dataset.id) return afficherTravaux(worksData);
  const categoryId = parseInt(event.currentTarget.dataset.id);
  const filteredData = worksData.filter(work => categoryId === work.category.id)
  afficherTravaux(filteredData);
}

let token = localStorage.getItem("Token");
const modeEdition = document.querySelector(".mode-edition");
const boutonModifier = document.querySelectorAll(".bouton-modifier");
if (token) {
  modeEdition.style.display = "block";
  boutonModifier.forEach(button => button.style.display = "block");

  login.innerHTML = "logout"
  login.addEventListener("click", () => {
      localStorage.removeItem("Token")
      window.location.href = "login.html"
  })
}
