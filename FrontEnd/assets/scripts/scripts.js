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

const getWorks = () => {
  return fetch("http://localhost:5678/api/works", {
    headers: { "accept": "application/json", "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
    });
};

const getCategory = () => {
  return fetch("http://localhost:5678/api/category", {
    headers: { "accept": "application/json", "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Une erreur s'est produite:", error);
    });
};

const filtresBoutons = document.querySelectorAll('.filtres__boutons');
const gallery = document.querySelector('.gallery');

Promise.all([getWorks(), getCategory()]).then(([worksData, categoryData]) => {
  const data = worksData;
  const categories = categoryData;

  AfficherTravaux(data);
  filtresBoutons.forEach((bouton, index) => {
    bouton.addEventListener('click', () => {
      const selectedCategoryId = index;

      while (gallery.firstChild) {
        gallery.firstChild.remove();
      }
      if (selectedCategoryId === 0) {
        AfficherTravaux(data);
      } else {
        const filteredWorks = data.filter(item => item.categoryId === selectedCategoryId);
        AfficherTravaux(filteredWorks);
      }

      filtresBoutons.forEach((bouton) => {
        bouton.classList.remove('filtres__boutons--select');
      });
      bouton.classList.add('filtres__boutons--select');
    });
  });
});